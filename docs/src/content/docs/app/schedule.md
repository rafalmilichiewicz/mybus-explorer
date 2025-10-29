---
title: Schedule
sidebar:
    order: 4
---

```ts
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
    public transitPointsForRoutes?: RouteTransitPoints[];

    public static fromDatabase(schedule: ScheduleDatabase) {}
    public static async fromFiles(basePath: string): Promise<Schedule> {}

    public setRouteTransitPoints(routeTransitPoints: RouteTransitPoints[]) {}
    public async saveToFiles(basePath: string);
}
```
