import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/env.ts';
import generateHeaders from '../token/header.ts';
import fetchDataXml from '../xml/fetch-data-xml.ts';

export async function getTimeTable(stop: number) {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const data = await fetchDataXml(`${ENDPOINTS.TIME_TABLE}${stop}`, headers);
    return data;
}
