import { generateHeaders } from '../token/header.ts';
import { fetchDataXml } from '../requests/fetch.ts';
import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/config.ts';

// True if schedule changed
// False if not
export type ResponseCompareSchedule = {
    int: 0 | 1;
};

export async function compareSchedule(version: number, generation: number) {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const query = `?nGeneracja=${generation}&nIdWersja=${version}`;
    const url = `${ENDPOINTS.SCHEDULE.COMPARE}${query}`;
    const comparison = await fetchDataXml<ResponseCompareSchedule>(url, headers);

    return comparison.int == 0;
}
