import type { RouteTransitPoints } from './route-points/point.ts';
import type { TimetableStop } from './timetable/stop.ts';
import type { TimetableVehicle } from './timetable/vehicle.ts';
import type { VehicleEnRoute } from './vehicles/vehicle.ts';
import type { Metadata } from '../db/schema/metadata.ts';
import { getRouteTransitPoints } from './route-points/route-points.ts';
import { compareSchedule } from './schedule/compare-schedule.ts';
import { getScheduleDatabase } from './schedule/get-schedule.ts';
import { getTimetableForStop } from './timetable/timetable-stop.ts';
import { getTimetableForVehicle } from './timetable/timetable-vehicle.ts';
import { getVehicles } from './vehicles/vehicles.ts';

export class ApiWrapper {
    constructor() {}

    public schedule = {
        save: getScheduleDatabase,
        compare: compareSchedule,
    };

    public timetable = {
        getForVehicle: getTimetableForVehicle,
        getForStop: getTimetableForStop,
    };

    public getOnlineVehicles = getVehicles;
    public getTransitPointsForRoute = getRouteTransitPoints;
}
