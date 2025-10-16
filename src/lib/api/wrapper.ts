import { getRouteTransitPoints } from './route-points/route-points.ts';
import { compareSchedule } from './schedule/compare-schedule.ts';
import { getScheduleDatabase, getScheduleDatabaseStream } from './schedule/get-schedule.ts';
import { getTimetableForStop } from './timetable/timetable-stop.ts';
import { getTimetableForVehicle } from './timetable/timetable-vehicle.ts';
import { getVehicles } from './vehicles/vehicles.ts';

export class ApiWrapper {
    constructor() {}

    public schedule = {
        saveToFile: getScheduleDatabase,
        getStream: getScheduleDatabaseStream,
        checkIfChanged: compareSchedule,
    };

    public timetable = {
        getForVehicle: getTimetableForVehicle,
        getForStop: getTimetableForStop,
    };

    public getOnlineVehicles = getVehicles;
    public getTransitPointsForRoute = getRouteTransitPoints;
}
