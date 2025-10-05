// @ts-types="node:sqlite"
import { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from '../db/schema.ts';
import { Metadata, MetadataSql } from '../db/schema/metadata.ts';
import { Route, DestinationSql } from '../db/schema/destination.ts';
import { StopSql, Stop } from '../db/schema/stop.ts';
import { StreetSql } from '../db/schema/street.ts';
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

    constructor(filename: string) {
        this.db = new DatabaseSync(filename, { readOnly: true, open: true });
        this.metadata = this.getMetadata();
        this.routes = this.generateRoutes();

        // TODO Extract function
        const uniqueRoutesByTransportMode = TRANSPORT_MODES.map((mode) => {
            const uniqueRoutes = new Set(
                this.routes
                    .filter((route) => route.transportMode.type === mode)
                    .map((route) => {
                        return {
                            number: route.number,
                            transportMode: route.transportMode,
                            night: route.night,
                            depot: route.depot,
                        } satisfies RouteDto;
                    })
                    .sort((route1, route2) => naturalSort(route1.number, route2.number))
            );
            return Array.from(uniqueRoutes);
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
                lineNumber: departure.numer_lini,
                departureTimes: splitDeparturesString(departure.odjazdy).map(toDepartureTime),
            } satisfies Departure;
        }) satisfies Departure[];

        // console.log(departures);
        return departures;
    }

    public async saveSchedule() {
        await Deno.writeTextFile('./stops.json', JSON.stringify(this.stops));
        await Deno.writeTextFile('./routes.json', JSON.stringify(this.routes));
        await Deno.writeTextFile('./routes_list.json', JSON.stringify(this.routeList));
        await Deno.writeTextFile('./points_of_sale.json', JSON.stringify(this.salesPoints));
        await Deno.writeTextFile('./calendar.json', JSON.stringify(this.calendar));
        await Deno.writeTextFile('./departures.json', JSON.stringify(this.departures));

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
