// @ts-types="node:sqlite"
import { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from '../db/schema.ts';
import { Metadata, MetadataSql } from '../db/schema/metadata.ts';
import { Route, DestinationSql } from '../db/schema/destination.ts';
import { StopSql, Stop } from '../db/schema/stop.ts';
import { Street, StreetSql } from '../db/schema/street.ts';
import { getStopsDestinations } from '../db/sql.ts';
import {
    Departure,
    DepartureSql,
    splitDeparturesString,
    toDepartureTime,
} from '../db/schema/departure.ts';
import {
    getRouteDirectionType,
    getVehicleType,
    TRANSPORT_MODES,
    VehicleTypeValid,
} from '../db/schema/ztm-types.ts';
import { getSalesPointType, SalesPoint, SalesPointSql } from '../db/schema/sales-point.ts';
import { Day, DaySql } from '../db/schema/day.ts';
import { CalendarEntry, CalendarEntrySql } from '../db/schema/calendar.ts';
import {
    Config,
    ConfigFlag,
    ConfigSql,
    convertConfigFlag,
    KNOWN_CONFIG_KEYS,
} from '../db/schema/config.ts';
import { Notice, NoticeSql } from '../db/schema/notice.ts';
import { constrainedMemory } from 'node:process';
type PickAsObject<T, K extends keyof T> = { [P in K]: T[P] };

function naturalSort(a: string, b: string) {
    const aNum = Number(a);
    const bNum = Number(b);

    const aIsNum = !isNaN(aNum);
    const bIsNum = !isNaN(bNum);

    if (aIsNum && bIsNum) {
        return aNum - bNum; // normal numeric sort
    }

    if (aIsNum) return -1; // numbers come first
    if (bIsNum) return 1;

    return a.localeCompare(b, 'pl', { numeric: true });
}

type PrefixedColumns<T extends Record<string, unknown>, Prefix extends string> = {
    [K in keyof T as `${Lowercase<Prefix>}_${Extract<K, string>}`]: T[K];
};

type PrefixedStreet = PrefixedColumns<StreetSql, 'street'>;
type PrefixedStop = PrefixedColumns<StopSql, 'stop'>;
function prefixedSelect<T extends Record<string, string>, Prefix extends string>(
    columns: T,
    prefix: Prefix
) {
    return Object.entries(columns).map(
        ([alias, col]) => `${prefix}.${col} AS ${prefix}_${columns[alias]}`
    );
}

// TODO Force either id or number to be present
// ? identifier: { id, number }
type RoutePatch = {
    id?: Route['id'];
    number?: Route['number'][];
    patch: Partial<Route>;
};

const patchesRoute = [
    {
        number: ['160', '950'],
        patch: {
            transportMode: {
                id: 'R',
                type: 'trolleybus',
            },
        },
    },
    {
        number: ['N1', 'N2', 'N3'],
        patch: {
            night: true,
        },
    },
    {
        number: ['950', 'B', 'Z'],
        patch: {
            depot: true,
        },
    },
] satisfies RoutePatch[];

type RouteDto = {
    number: Route['number'];
    transportMode: Route['transportMode'];
    night: boolean;
    depot: boolean;
};

type TimetableEntry = Omit<Departure, 'stopIdSip | dayType'>;
type Timetable = {
    [stopIdSip: Departure['stopIdSip']]: {
        [dayType: Departure['dayType']]: TimetableEntry[];
    };
};

function groupByStopAndDay(data: TimetableEntry[]): Timetable {
    return data.reduce<Timetable>((acc, entry) => {
        const { stopIdSip, dayType } = entry;

        if (!acc[stopIdSip]) {
            acc[stopIdSip] = {};
        }

        if (!acc[stopIdSip][dayType]) {
            acc[stopIdSip][dayType] = [];
        }

        acc[stopIdSip][dayType].push(entry);

        return acc;
    }, {});
}

export class Schedule {
    private db: DatabaseSync;
    public metadata: Metadata;
    private routes: Route[];
    private routeList: {
        routesBus: RouteDto[];
        routesTram: RouteDto[];
        routesTrolleybus: RouteDto[];
    };
    private stops: Stop[];
    private salesPoints: SalesPoint[];
    private calendar: {
        types: Day[];
        entries: CalendarEntry[];
    };
    private departures: Departure[];
    private timetable: Timetable;
    private streets: Street[];
    private config: Config;
    private notices: Notice[];

    constructor(filename: string) {
        this.db = new DatabaseSync(filename, { readOnly: true, open: true });
        this.metadata = this.getMetadata();
        this.routes = this.generateRoutes();

        // TODO Extract function
        const uniqueRoutesByTransportMode = TRANSPORT_MODES.map((mode) => {
            const seenNumbers = new Set<string>();

            return this.routes
                .filter((route) => route.transportMode.type === mode)
                .filter((route) => {
                    if (seenNumbers.has(route.number)) {
                        return false;
                    }
                    seenNumbers.add(route.number);
                    return true;
                })
                .map((route) => {
                    return {
                        number: route.number,
                        transportMode: route.transportMode,
                        night: route.night,
                        depot: route.depot,
                    } satisfies RouteDto;
                })
                .sort((route1, route2) => naturalSort(route1.number, route2.number));
        });

        this.routeList = {
            routesBus: uniqueRoutesByTransportMode[0],
            routesTram: uniqueRoutesByTransportMode[1],
            routesTrolleybus: uniqueRoutesByTransportMode[2],
        };

        this.stops = this.generateStops();
        this.salesPoints = this.generateSalesPoints();
        this.calendar = {
            types: this.generateDayTypes(),
            entries: this.generateCalendarEntries(),
        };
        this.departures = this.generateDepartures();

        this.timetable = groupByStopAndDay(this.departures);
        this.streets = this.generateStreets();
        this.notices = this.generateNotices();
        this.config = this.generateConfig();
    }

    private getMetadata(): Metadata {
        const metaSql = this.db
            .prepare(`SELECT * FROM ${SCHEMA.METADATA.__table__}`)
            .get() as MetadataSql;

        return {
            validFrom: metaSql.wazna_od,
            version: metaSql.id_wersja,
            generation: metaSql.generacja,
        };
    }

    public generateRoutes() {
        // TODO add patches
        const routesSql = this.db.prepare(
            // `SELECT DISTINCT dest.${SCHEMA.DESTINATIONS.__columns__.DESTINATION}, dest.${SCHEMA.DESTINATIONS.__columns__.LINE_NUMBER}, dest.${SCHEMA.DESTINATIONS.__columns__.ROUTE_VARIANT}
            `SELECT * FROM ${SCHEMA.DESTINATIONS.__table__} dest 
                -- INNER JOIN ${SCHEMA.DEPARTURES.__table__} dep 
                -- ON dest.${SCHEMA.DESTINATIONS.__columns__.ID} = dep.${SCHEMA.DEPARTURES.__columns__.DESTINATION_ID}`
        );
        // console.log(routesSql.expandedSQL);
        const routesRaw = routesSql.all() as DestinationSql[];
        // console.log(routesSql);

        const routes = routesRaw.map((destination) => {
            const stops = destination.trasa.split(',').map((stopId) => Number.parseInt(stopId));
            if (stops.includes(Number.NaN)) {
                throw Error('Stop found to be not a integer');
            }
            const routeNumber = destination.numer.trim();

            let defaultRoute = {
                id: destination.id_krn,
                number: routeNumber,
                transportMode: getVehicleType(destination.transport),
                direction: destination.opis_tabl.trim().replaceAll('  ', ' '), // TODO Extract parsing and cleaning to func
                stops,
                variant: destination.war_trasy,
                routeKey: `${routeNumber}-${destination.war_trasy}`,
                routeDirection: getRouteDirectionType(destination.kierunek),
                routeCode: destination.kod,
                _defaultVariant: destination.podstawowy,
                _description: destination.opis2tabl,
                _descriptionNumber: destination.lp_opis2tabl,
                night: false,
                depot: false,
            } satisfies Route;

            const patches = patchesRoute.filter((patch) => patch.number.includes(routeNumber));
            if (patches.length > 0) {
                const mergedPatches = patches.reduce((acc, p) => ({ ...acc, ...p.patch }), {});
                defaultRoute = {
                    ...defaultRoute,
                    ...mergedPatches,
                };
            }

            return defaultRoute;
        }) satisfies Route[];

        return routes;
    }

    generateStops() {
        // TODO Do this clever with .join()
        // TODO Move to sql
        // str.${SCHEMA.STREETS.__columns__.ID}, str.${SCHEMA.STREETS.__columns__.ID}
        const prefixedStops = prefixedSelect(SCHEMA.STOPS.__columns__, 'stop');
        const prefixedStreet = prefixedSelect(SCHEMA.STREETS.__columns__, 'street');
        const sql = `
            SELECT DISTINCT ${[...prefixedStops, prefixedStreet].join(',\n')} 
            FROM ${SCHEMA.STOPS.__table__} stop
            INNER JOIN ${SCHEMA.STREETS.__table__} street 
            ON street.${SCHEMA.STREETS.__columns__.ID} = stop.${SCHEMA.STOPS.__columns__.STREET_ID}
            INNER JOIN ${SCHEMA.DESTINATIONS.__table__} dest
            ON  ',' || dest.${SCHEMA.DESTINATIONS.__columns__.ROUTE} || ',' LIKE '%,' || stop.${
            SCHEMA.STOPS.__columns__.ID_SIP
        } || ',%'`;

        // console.log(sql);

        const stopsSqlRaw = this.db.prepare(sql);
        // console.log(stopsSqlRaw.expandedSQL);
        const stopsSql = stopsSqlRaw.all() as (PrefixedStop & PrefixedStreet)[];

        const patched = getStopsDestinations(this.db);

        const stops = stopsSql.map((el) => {
            const sip = el.stop_id;
            const [groupName, groupNumber] = parseStopDescription(el.stop_id, el.stop_nazwa.trim());
            const stopRoutes = this.routes.filter((route) => route.stops.includes(sip));

            const [routesBus, routesTram, routesTrolleybus] = getRoutesForStop(stopRoutes);
            return {
                idSip: sip,
                idZtm: el.stop_numer,
                streetId: el.stop_id_ul,
                streetName: el.street_nazwa,
                order: el.stop_sort,
                description: el.stop_nazwa.trim(),
                groupName,
                groupNumber,
                longitude: el.stop_lon,
                latitude: el.stop_lat,
                linesBus: routesBus,
                linesTram: routesTram,
                linesTrolleybus: routesTrolleybus,
                destinations: patched.find((p) => p.id === sip)?.dest ?? [],
                transportMode: el.stop_transport,
            } satisfies Stop;

            function getRoutesForStop(stopRoutes: Route[]) {
                return TRANSPORT_MODES.map((mode) => {
                    const uniqueRoutes = new Set(
                        stopRoutes
                            .filter((route) => route.transportMode.type === mode)
                            .map((route) => route.number)
                            .sort(naturalSort)
                    );
                    return Array.from(uniqueRoutes);
                });
            }
        });
        return stops;
    }

    generateSalesPoints() {
        const sql = `SELECT * FROM ${SCHEMA.SALES_POINTS.__table__}`;
        const pointsSql = this.db.prepare(sql);
        const pointsRaw = pointsSql.all() as SalesPointSql[];

        const points = pointsRaw.map((point) => {
            return {
                id: point.id,
                name: point.nazwa.trim(),
                type: getSalesPointType(point.id_pktp),
                longitude: point.lon,
                latitude: point.lat,
            } satisfies SalesPoint;
        }) satisfies SalesPoint[];
        return points;
    }

    generateDayTypes() {
        const sql = `SELECT * FROM ${SCHEMA.DAYS.__table__}`;
        const daysSql = this.db.prepare(sql);
        const daysRaw = daysSql.all() as DaySql[];

        const dayTypes = daysRaw.map((day) => {
            return {
                type: day.typ_dnia,
                description: day.opis_dnia,
                displayOrder: day.kolej_wydr,
            } satisfies Day;
        }) satisfies Day[];

        return dayTypes;
    }

    generateCalendarEntries() {
        // TODO Add patches
        // TODO Add "night" bus days as property to entry type
        const sql = `SELECT * FROM ${SCHEMA.CALENDAR.__table__}`;
        const calendarSql = this.db.prepare(sql);
        const calendarRaw = calendarSql.all() as CalendarEntrySql[];

        const calendar = calendarRaw.map((entry) => {
            const date = new Date(entry.dt_kal);
            if (Number.isNaN(date.valueOf())) {
                throw new Error('Encountered invalid date string');
            }
            return {
                dayType: entry.td_rj,
                date: date,
            } satisfies CalendarEntry;
        }) satisfies CalendarEntry[];

        return calendar;
    }

    generateDepartures() {
        const sql = `SELECT * FROM ${SCHEMA.DEPARTURES.__table__}`;
        const departuresSql = this.db.prepare(sql);
        const departuresRaw = departuresSql.all() as DepartureSql[];

        const departures = departuresRaw.map((departure) => {
            return {
                destinationId: departure.id_krn,
                dayType: departure.typ_dnia,
                routeVariant: departure.war_trasy,
                stopIdSip: departure.bus_stop_id, // TODO Compute in code
                stopNumberOnRoute: departure.lp_przyst,
                lineNumber: departure.numer_lini.trim(),
                departureTimes: splitDeparturesString(departure.odjazdy).map(toDepartureTime),
            } satisfies Departure;
        }) satisfies Departure[];

        // console.log(departures);
        return departures;
    }

    generateStreets(): Street[] {
        const sql = `SELECT * FROM ${SCHEMA.STREETS.__table__}`;
        const streetsSql = this.db.prepare(sql);
        const streetsRaw = streetsSql.all() as StreetSql[];

        const streets = streetsRaw.map((street) => {
            return {
                id: street.id,
                name: street.nazwa,
            } satisfies Street;
        }) satisfies Street[];

        return streets;
    }

    generateConfig(): Config {
        const sql = `SELECT * FROM ${SCHEMA.CONFIG.__table__}`;
        const configSql = this.db.prepare(sql);
        const configRaw = configSql.all() as ConfigSql[];

        // Default blank config
        const config: Config = {
            TripPlannerEnabled: false,
            TripPlannerVersion: '',
            StreetsEnabled: false,
            VehicleNotesEnabled: false,
            VehicleVarianceEnabled: false,
            _others: {},
            VehicleSideNumberEnabled: false,
        };

        configRaw.forEach(({ name, value }) => {
            console.log(name, value);
            const flag: boolean | undefined = convertConfigFlag(value);
            switch (true) {
                case name === KNOWN_CONFIG_KEYS.TripPlannerEnabled && flag !== undefined:
                    config.TripPlannerEnabled = flag;
                    break;
                case name === KNOWN_CONFIG_KEYS.TripPlannerVersion:
                    config.TripPlannerVersion = value;
                    break;
                case name === KNOWN_CONFIG_KEYS.StreetsEnabled && flag !== undefined:
                    config.StreetsEnabled = flag;
                    break;
                case name === KNOWN_CONFIG_KEYS.VehicleNotesEnabled && flag !== undefined:
                    config.VehicleNotesEnabled = flag;
                    break;
                case name === KNOWN_CONFIG_KEYS.VehicleSideNumberEnabled && flag !== undefined:
                    config.VehicleSideNumberEnabled = flag;
                    break;
                case name === KNOWN_CONFIG_KEYS.VehicleVarianceEnabled && flag !== undefined:
                    config.VehicleVarianceEnabled = flag;
                    break;
                default:
                    config._others[name] = value;
                    break;
            }
        });

        return config;
    }
    generateNotices(): Notice[] {
        const sql = `SELECT * FROM ${SCHEMA.NOTICES.__table__}`;
        const noticesSql = this.db.prepare(sql);
        const noticesRaw = noticesSql.all() as NoticeSql[];

        const notices = noticesRaw.map((notice) => {
            return {
                routeNumber: notice.numer_linii,
                name: notice.ozn_uwagi,
                content: notice.tresc_uwag,
            } satisfies Notice;
        }) satisfies Notice[];

        return notices;
    }

    public async saveSchedule() {
        await Deno.writeTextFile('./stops.json', JSON.stringify(this.stops));
        await Deno.writeTextFile('./routes.json', JSON.stringify(this.routes));
        await Deno.writeTextFile('./routes_list.json', JSON.stringify(this.routeList));
        await Deno.writeTextFile('./points_of_sale.json', JSON.stringify(this.salesPoints));
        await Deno.writeTextFile('./calendar.json', JSON.stringify(this.calendar));
        await Deno.writeTextFile('./departures.json', JSON.stringify(this.departures));
        await Deno.writeTextFile('./timetable.json', JSON.stringify(this.timetable));
        await Deno.writeTextFile('./streets.json', JSON.stringify(this.streets));
        await Deno.writeTextFile('./notices.json', JSON.stringify(this.notices));
        await Deno.writeTextFile('./config.json', JSON.stringify(this.config));
    }

    // public get;
}

export function parseStopDestinations(idSip: number, db: DatabaseSync) {
    // console.log(idSip);
}

export function parseStopDescription(idSip: number, description: string) {
    // TODO Add patches system
    // console.log(stop);

    const match = description.match(/^(.*?)(\d+)\s*$/);

    if (!match) {
        throw new Error(idSip + description);
    }

    const groupName = match[1].trim();
    const groupNumber = match[2];
    return [groupName, groupNumber] as const;
}

// TODO Get destinations of each stop
