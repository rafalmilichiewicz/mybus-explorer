import { ENDPOINTS } from "../consts/endpoints.ts";
import { LUBLIN_AGE } from "../consts/magic-numbers.ts";
import generateHeaders from "../token/header.ts";
import fetchDataXml from "../xml/fetch-data-xml.ts";

export type ResponseCompareSchedule = {
    int: 0 | 1
}

// True if schedule changed
// False if not
export async function compareSchedule(version: number, generation: number) {

    const headers = await generateHeaders(LUBLIN_AGE);
    const query = `?nGeneracja=${generation}&nIdWersja=${version}`
    const url = `${ENDPOINTS.SCHEDULE.COMPARE}${query}`
    console.log(url)
    const comparison = await fetchDataXml<ResponseCompareSchedule>(url, headers);

    return comparison.int == 0
}