import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/config.ts';
import generateHeaders from '../token/header.ts';
import { fetchDataBinary } from '../requests/fetch.ts';

export async function getScheduleDatabase(callback: (response: Response) => Promise<boolean>) {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const response = await fetchDataBinary(`${ENDPOINTS.SCHEDULE.GET}`, headers);

    return callback(response);
}
