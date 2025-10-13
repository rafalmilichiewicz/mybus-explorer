import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/config.ts';
import generateHeaders from '../token/header.ts';
import { fetchDataXml } from '../requests/fetch.ts';
import type {
    StopDepartureInfo,
    TimetableStop,
    TimetableStopApi,
    TimeTableStopDepartureApi,
} from './stop.ts';
import { toDepartureTime } from '../../db/schema/departure.ts';
import {
    getRouteDirectionType,
    getTrackingStatus,
    getVehicleFlags,
    getVehicleType,
} from '../../db/schema/ztm-types.ts';

export async function getTimetableForStop(stop: number): Promise<TimetableStop> {
    // TODO Add check if stop is present in Schedule db, but not here on the outside

    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const data = await fetchDataXml<TimetableStopApi>(
        `${ENDPOINTS.TIME_TABLE.STOP}${stop}`,
        headers
    );

    const departuresData = data.Departures.D ?? [];
    const stopIdSip = Number.parseInt(data.Departures?.i ?? '0', 10);

    const timetableForStop: TimetableStop = {
        stopIdSip: stopIdSip,
        currentTime: data.Departures?.time ?? '',
        departures: Array.isArray(departuresData)
            ? departuresData.map(toStopDepartureInfo)
            : [toStopDepartureInfo(departuresData)],
    };

    return timetableForStop;

    function toStopDepartureInfo(departure: TimeTableStopDepartureApi) {
        return {
            id: departure.i,
            estimatedDeparture: {
                time: toDepartureTime(departure.t),
                seconds: Number.parseInt(departure.vr),
                label: departure.v,
            },
            trackingStatus: getTrackingStatus(Number.parseInt(departure.m)),
            destination: departure.d,
            route: {
                direction: getRouteDirectionType(departure.dd),
                number: departure.r,
                id: departure.di,
            },
            vehicle: {
                sideNumber: departure.n,
                type: getVehicleType(departure.p),
                flags: getVehicleFlags(departure.vn),
            },
        } satisfies StopDepartureInfo;
    }
}
