import type { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from './schema.ts';
import type { Stop, StopSql } from './schema/stop.ts';
import type { ScheduleMetadata, MetadataSql } from './schema/metadata.ts';
import { naturalSort } from '../utils/natural-sort.ts';
import type { CalendarEntrySql, CalendarEntry } from './schema/calendar.ts';
import {
    type Config,
    type ConfigSql,
    convertConfigFlag,
    KNOWN_CONFIG_KEYS,
} from './schema/config.ts';
import type { DaySql, Day } from './schema/day.ts';
import {
    type DepartureSql,
    splitDeparturesString,
    toDepartureTime,
    type Departure,
} from './schema/departure.ts';
import type { DestinationSql, Route } from './schema/destination.ts';
import type { Notice, NoticeSql } from './schema/notice.ts';
import { type SalesPointSql, getSalesPointType, type SalesPoint } from './schema/sales-point.ts';
import type { Street, StreetSql } from './schema/street.ts';
import { getVehicleType, getRouteDirectionType, TRANSPORT_MODES } from './schema/ztm-types.ts';

import type { DatabasePatches } from './patch/patch.ts';
import { isRoutePatchByNumber } from './patch/patch-route.ts';

type PickAsObject<T, K extends keyof T> = { [P in K]: T[P] };

type PrefixedColumns<T extends Record<string, unknown>, Prefix extends string> = {
    [K in keyof T as `${Lowercase<Prefix>}_${Extract<K, string>}`]: T[K];
};

type PrefixedStreet = PrefixedColumns<StreetSql, 'street'>;
type PrefixedStop = PrefixedColumns<StopSql, 'stop'>;

const stopId = SCHEMA.STOPS.__columns__.ID_SIP;
const stop = 'stop';
const dest = 'destinations';

function prefixedSelect<T extends Record<string, string>, Prefix extends string>(
    columns: T,
    prefix: Prefix
) {
    return Object.entries(columns).map(
        ([alias, col]) => `${prefix}.${col} AS ${prefix}_${columns[alias]}`
    );
}

// TODO Add DTOs

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

type z = ({ id: Stop['idSip'] } & { destinations: string })[];

export class ScheduleDatabase {
    private db: DatabaseSync;
    private patches: DatabasePatches;

    // TODO Rename
    constructor(dbHandle: DatabaseSync, patches: DatabasePatches) {
        this.db = dbHandle;
        this.patches = patches;
    }

    public getStopsDestinations() {
        const sql = `SELECT ${stop}.${stopId},
    JSON_GROUP_ARRAY(DISTINCT TRIM(${dest}.${SCHEMA.DESTINATIONS.__columns__.DESTINATION})) AS ${dest}
    FROM ${SCHEMA.STOPS.__table__} ${stop}
    INNER JOIN ${SCHEMA.DESTINATIONS.__table__} ${dest}
    ON ',' || ${dest}.${SCHEMA.DESTINATIONS.__columns__.ROUTE} || ',' LIKE '%,' || ${stop}.${stopId} || ',%'
    GROUP BY ${stop}.${stopId}
    ORDER BY ${stop}.${stopId}`;

        // TODO Type
        type StopDestinationsSql = {
            id: Stop['idSip'];
            destinations: string; // JSON
        };
        const result = this.db.prepare(sql).all() as StopDestinationsSql[];
        const res = result.map((el) => {
            return {
                id: el.id,
                dest: (JSON.parse(el.destinations as string) as string[]).map((el) =>
                    el.trim().replaceAll('  ', ' ')
                ),
            };
        });

        return res;
    }

    public getMetadata(): ScheduleMetadata {
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
            const routeId = destination.id_krn;

            let defaultRoute = {
                id: routeId,
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

            // TODO Add patches to stops
            const patches = this.patches.routes.patches.filter((patch) => {
                if (isRoutePatchByNumber(patch) && patch.number.includes(routeNumber)) {
                    return true;
                } else if (!isRoutePatchByNumber(patch) && patch.id === routeId) {
                    return true;
                } else {
                    return false;
                }
            });
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
    generateStops(routes: Route[]) {
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

        const patched = this.getStopsDestinations();

        const stops = stopsSql.map((el) => {
            const sip = el.stop_id;
            const [groupName, groupNumber] = parseStopDescription(el.stop_id, el.stop_nazwa.trim());
            const stopRoutes = routes.filter((route) => route.stops.includes(sip));

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
                routes: {
                    bus: routesBus,
                    tram: routesTram,
                    trolleybus: routesTrolleybus,
                },
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
                position: {
                    longitude: point.lon,
                    latitude: point.lat,
                },
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
            const date = Temporal.PlainDate.from(entry.dt_kal);
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
}
