import { CONFIG } from '../../../consts/config.ts';
import { ENDPOINTS } from '../../../consts/endpoints.ts';
import { getTrackingStatus } from '../../../db/schema/ztm-types.ts';
import { fetchDataXml } from '../../requests/fetch.ts';
import { generateHeaders } from '../../token/header.ts';
import type {
    TimetableVehicle,
    TimeTableVehicleApi,
    TimeTableVehicleStopApi,
    VehicleStopInfo,
} from './type.ts';

export async function getTimetableForVehicle(sideNumber: string): Promise<TimetableVehicle> {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const data = await fetchDataXml<TimeTableVehicleApi>(
        `${ENDPOINTS.TIME_TABLE.VEHICLE}${sideNumber}`,
        headers
    );

    const timetableForVehicle: TimetableVehicle = parseTimetableForVehicle(data);
    return timetableForVehicle;
}

export function toVehicleStopInfo(stop: TimeTableVehicleStopApi): VehicleStopInfo {
    const label = stop.th === '' ? stop.tm : `${stop.th}:${stop.tm}`;
    return {
        stop: {
            numberEnRoute: Number.parseInt(stop.lp),
            idSip: Number.parseInt(stop.id),
            name: stop.name,
        },
        time: {
            label,
            seconds: Number.parseInt(stop.s),
        },
        status: getTrackingStatus(Number.parseInt(stop.m)),
    };
}

export function parseTimetableForVehicle(data: TimeTableVehicleApi) {
    const stopsData = data.Schedules.Stop ?? [];
    const id = Number.parseInt(data.Schedules.id);
    const timetableForVehicle: TimetableVehicle = {
        id: Number.isNaN(id) ? 0 : id,
        route: {
            number: data.Schedules.nr ? data.Schedules.nr.trim() : '',
            variant: data.Schedules.type ? data.Schedules.type : '',
            destination: data.Schedules.o ? data.Schedules.o : '',
        },
        stops: Array.isArray(stopsData)
            ? stopsData.map(toVehicleStopInfo)
            : [toVehicleStopInfo(stopsData)],
    };
    return timetableForVehicle;
}
