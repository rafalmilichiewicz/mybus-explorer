import type { Metadata } from './schema/metadata.ts';
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

export class Schedule {
    // private db: DatabaseSync;
    private db: ScheduleDatabase;
    public metadata: Metadata;
    public routes: Route[];
    public routeList: {
        routesBus: RouteDto[];
        routesTram: RouteDto[];
        routesTrolleybus: RouteDto[];
    };
    public stops: Stop[];
    public salesPoints: SalesPoint[];
    public calendar: {
        types: Day[];
        entries: CalendarEntry[];
    };
    public departures: Departure[];
    public timetable: Timetable;
    public streets: Street[];
    public config: Config;
    public notices: Notice[];

    constructor(schedule: ScheduleDatabase) {
        this.db = schedule;
        this.metadata = this.db.getMetadata();
        this.routes = this.db.generateRoutes();

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

        this.stops = this.db.generateStops(this.routes);
        this.salesPoints = this.db.generateSalesPoints();
        this.calendar = {
            types: this.db.generateDayTypes(),
            entries: this.db.generateCalendarEntries(),
        };
        this.departures = this.db.generateDepartures();

        // TODO Hold in memory only - no export
        this.timetable = groupByStopAndDay(this.departures);
        this.streets = this.db.generateStreets();
        this.notices = this.db.generateNotices();
        this.config = this.db.generateConfig();
    }

    public async saveSchedule() {
        await Deno.writeTextFile('./metadata.json', JSON.stringify(this.metadata));
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
}
