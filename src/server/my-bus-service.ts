import type { RouteTransitPoints } from '../lib/api/route-points/point.ts';
import type { TimetableStop } from '../lib/api/timetable/stop.ts';
import type { TimetableVehicle } from '../lib/api/timetable/vehicle.ts';
import type { VehicleEnRoute } from '../lib/api/vehicles/vehicle.ts';
import type { Metadata } from '../lib/db/schema/metadata.ts';
import { getRouteTransitPoints } from '../lib/api/route-points/route-points.ts';
import { compareSchedule } from '../lib/api/schedule/compare-schedule.ts';
import { getScheduleDatabase } from '../lib/api/schedule/get-schedule.ts';
import { getTimetableForStop } from '../lib/api/timetable/timetable-stop.ts';
import { getTimetableForVehicle } from '../lib/api/timetable/timetable-vehicle.ts';
import { getVehicles } from '../lib/api/vehicles/vehicles.ts';

export class MyBusApiWrapper {
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
