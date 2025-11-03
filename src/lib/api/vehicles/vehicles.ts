import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/config.ts';
import {
    getRouteDirectionType,
    getVehicleFlags,
    getVehicleStatus,
    getVehicleType,
} from '../../db/schema/ztm-types.ts';
import { fetchDataXml } from '../requests/fetch.ts';
import { generateHeaders } from '../token/header.ts';

import type { VehicleApi, VehicleEnRoute } from './vehicle.ts';

export async function getVehicles(route: string = ''): Promise<VehicleEnRoute[]> {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const data = await fetchDataXml<VehicleApi>(`${ENDPOINTS.VEHICLES}${route}`, headers);

    return parseVehiclesEnRoute(data);
}

export function parseVehiclesEnRoute(
    data: VehicleApi
): VehicleEnRoute[] | PromiseLike<VehicleEnRoute[]> {
    let vehicles = data.VL.V ?? [];
    vehicles = Array.isArray(vehicles) ? vehicles : ([vehicles] as VehicleApi['VL']['V']);

    return vehicles.map((vehicle) => {
        return {
            id: vehicle.id,
            sideNumer: vehicle.nb,
            position: {
                longitude: Number.parseFloat(vehicle.x),
                latitude: Number.parseFloat(vehicle.y),
            },
            _positionP: {
                longitude: Number.parseFloat(vehicle.px),
                latitude: Number.parseFloat(vehicle.py),
            },
            status: getVehicleStatus(Number.parseInt(vehicle.s)),
            currentRoute: {
                number: vehicle.nr,
                destination: vehicle.op,
                variant: vehicle.wt,
                direction: getRouteDirectionType(vehicle.kr),
                id: vehicle.ik,
            },
            nextRoute: {
                number: vehicle.nnr,
                destination: vehicle.nop,
                variant: vehicle.nwt,
                direction: getRouteDirectionType(vehicle.nkr),
                id: vehicle.nk,
            },
            delay: Number.parseInt(vehicle.o),
            flags: getVehicleFlags(vehicle.c),
            type: getVehicleType(vehicle.vt),
            nextStopOnRouteIndex: Number.parseInt(vehicle.lp),
            brigade: vehicle.kwi,
            plannedDepartureTime: vehicle.p,
        } satisfies VehicleEnRoute;
    });
}
