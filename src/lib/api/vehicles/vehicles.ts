import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/env.ts';
import fetchDataXml from '../requests/fetch.ts';
import generateHeaders from '../token/header.ts';

import type { VehicleApi, VehicleEnRoute } from './vehicle.ts';

// Empty string = all vehicles
export default async function getVehicles(route: string = '') {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const data = await fetchDataXml<VehicleApi>(`${ENDPOINTS.VEHICLES}${route}`, headers);

    // return data.VL.V.map(vehicle => {
    //     return {} satisfies VehicleEnRoute;
    // });
    return data;
}
