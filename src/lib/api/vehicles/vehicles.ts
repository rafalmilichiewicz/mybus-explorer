import { ENDPOINTS } from "../../consts/endpoints.ts";
import { LUBLIN_AGE } from "../../consts/magic-numbers.ts";
import generateHeaders from '../token/header.ts';
import fetchDataXml from '../xml/fetch-data-xml.ts';
import type { VehicleApi, VehicleEnRoute } from "./vehicle.ts";

// Empty string = all vehicles
export default async function getVehicles(route: string = '') {
    const headers = await generateHeaders(LUBLIN_AGE);
    const data = await fetchDataXml<VehicleApi>(`${ENDPOINTS.VEHICLES}${route}`, headers);
    
    // return data.VL.V.map(vehicle => {
    //     return {} satisfies VehicleEnRoute;
    // });
    return data;
}
