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

    public async saveScheduleDatabase(filename: string): Promise<boolean> {
        const result = await getScheduleDatabase(async (response) => {
            const file = await Deno.open(filename, { create: true, write: true });

            try {
                const decompressionStream = new DecompressionStream('gzip');
                response.body!.pipeThrough(decompressionStream).pipeTo(file.writable);
                return true;
            } catch (error) {
                console.error('Failed to decompress gzip data:', error);
            }

            return false;
        });

        return result;
    }

    public async compareScheduleMetadata(metadata: Metadata) {
        return await compareSchedule(metadata.version, metadata.generation);
    }

    public async getOnlineVehicles(routeNumber: string): Promise<VehicleEnRoute[]> {
        const vehicles = await getVehicles(routeNumber);
        return vehicles;
    }

    public async getTimetableForVehicle(sideNumber: string): Promise<TimetableVehicle> {
        const timetable = await getTimetableForVehicle(sideNumber);
        return timetable;
    }

    public async getTimetableForStop(idSip: number): Promise<TimetableStop> {
        const timetable = await getTimetableForStop(idSip);
        return timetable;
    }

    public async getTransitPointForRoute(
        routeNumber: string,
        routeVariant: string
    ): Promise<RouteTransitPoints> {
        const route = await getRouteTransitPoints(routeNumber, routeVariant);
        return route;
    }
}
