import type { ScheduleMetadata } from './schema/metadata.ts';
import type { Route } from './schema/destination.ts';
import type { Stop } from './schema/stop.ts';
import type { Street } from './schema/street.ts';
import type { ScheduleDatabase } from './sql.ts';
import type { Departure } from './schema/departure.ts';
import { TRANSPORT_MODES } from './schema/ztm-types.ts';
import type { SalesPoint } from './schema/sales-point.ts';
import type { Day } from './schema/day.ts';
import type { CalendarEntry } from './schema/calendar.ts';
import type { Config } from './schema/config.ts';
import type { Notice } from './schema/notice.ts';
import { naturalSort } from '../utils/natural-sort.ts';
import { generateScheduleResources } from '../consts/resources.ts';
import { readJson, saveJson } from '../utils/files.ts';

// TODO Rename and move
export type RouteDto = {
    number: Route['number'];
    transportMode: Route['transportMode'];
    night: boolean;
    depot: boolean;
};

export type TimetableEntry = Omit<Departure, 'stopIdSip | dayType'>;
export type Timetable = {
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

export type Calendar = {
    types: Day[];
    entries: CalendarEntry[];
};

export type RouteList = {
    routesBus: RouteDto[];
    routesTram: RouteDto[];
    routesTrolleybus: RouteDto[];
};
export class Schedule {
    public calendar: Calendar;
    public config: Config;
    public departures: Departure[];
    public metadata: ScheduleMetadata;
    public notices: Notice[];
    public routes: Route[];
    public salesPoints: SalesPoint[];
    public stops: Stop[];
    public streets: Street[];
    public routeList: RouteList;
    public timetable: Timetable;

    private constructor(
        calendar: Calendar,
        config: Config,
        departures: Departure[],
        metadata: ScheduleMetadata,
        notices: Notice[],
        routes: Route[],
        salesPoints: SalesPoint[],
        stops: Stop[],
        streets: Street[]
    ) {
        this.calendar = calendar;
        this.config = config;
        this.departures = departures;
        this.metadata = metadata;
        this.notices = notices;
        this.routes = routes;
        this.salesPoints = salesPoints;
        this.stops = stops;
        this.streets = streets;

        const uniqueRoutesByTransportMode = TRANSPORT_MODES.map((mode) => {
            const seenNumbers = new Set<string>();

            return routes
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

        this.timetable = groupByStopAndDay(departures);
    }

    public static fromDatabase(schedule: ScheduleDatabase) {
        const db: ScheduleDatabase = schedule;
        const metadata = db.getMetadata();
        const routes = db.generateRoutes();
        const stops = db.generateStops(routes);
        const salesPoints = db.generateSalesPoints();
        const calendar = {
            types: db.generateDayTypes(),
            entries: db.generateCalendarEntries(),
        };
        const departures = db.generateDepartures();
        const streets = db.generateStreets();
        const notices = db.generateNotices();
        const config = db.generateConfig();

        return new Schedule(
            calendar,
            config,
            departures,
            metadata,
            notices,
            routes,
            salesPoints,
            stops,
            streets
        );
    }

    public static async fromFiles(basePath: string): Promise<Schedule> {
        const resources = generateScheduleResources(basePath);
        const calendar = await readJson<Calendar>(resources.calendarFile);
        const config = await readJson<Config>(resources.configFile);
        const departures = await readJson<Departure[]>(resources.departuresFile);
        const metadata = await readJson<ScheduleMetadata>(resources.metadataFile);
        const notices = await readJson<Notice[]>(resources.noticesFile);
        const routes = await readJson<Route[]>(resources.routesFile);
        const salesPoints = await readJson<SalesPoint[]>(resources.pointsOfSaleFile);
        const stops = await readJson<Stop[]>(resources.stopsFile);
        const streets = await readJson<Street[]>(resources.streetsFile);

        // TODO Add validation
        if (
            calendar === null ||
            config === null ||
            departures === null ||
            metadata === null ||
            notices === null ||
            routes === null ||
            salesPoints === null ||
            stops === null ||
            streets === null
        ) {
            throw new Error('Encountered problem while loading schedule data from files');
        }

        return new Schedule(
            calendar,
            config,
            departures,
            metadata,
            notices,
            routes,
            salesPoints,
            stops,
            streets
        );
    }

    public async saveToFiles(basePath: string) {
        const resources = generateScheduleResources(basePath);
        await saveJson(resources.calendarFile, this.calendar);
        await saveJson(resources.configFile, this.config);
        await saveJson(resources.departuresFile, this.departures);
        await saveJson(resources.metadataFile, this.metadata);
        await saveJson(resources.noticesFile, this.notices);
        await saveJson(resources.routesFile, this.routes);
        await saveJson(resources.pointsOfSaleFile, this.salesPoints);
        await saveJson(resources.stopsFile, this.stops);
        await saveJson(resources.streetsFile, this.streets);
    }
}
