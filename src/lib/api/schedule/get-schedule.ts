import { ENDPOINTS } from '../../consts/endpoints.ts';
import generateHeaders from '../token/header.ts';
import fetchDataBinary from '../xml/fetch-data-binary.ts';
import { CONFIG } from '../../consts/env.ts';

export async function getSchedule(filename: string) {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const response = await fetchDataBinary(`${ENDPOINTS.SCHEDULE.GET}`, headers);
    const file = await Deno.open(filename, { create: true, write: true });
    console.log(response.headers);

    try {
        console.log('EEE');

        const decompressionStream = new DecompressionStream('gzip');
        response.body!.pipeThrough(decompressionStream).pipeTo(file.writable);
        return true;
    } catch (error) {
        console.error('Failed to decompress gzip data:', error);
    }

    return false;
}
