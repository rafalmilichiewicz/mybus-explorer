import { ENDPOINTS } from '../../consts/endpoints.ts';
import { CONFIG } from '../../consts/config.ts';
import generateHeaders from '../token/header.ts';
import { fetchDataBinary } from '../requests/fetch.ts';

export async function getScheduleDatabase(filename: string): Promise<boolean> {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const response = await fetchDataBinary(`${ENDPOINTS.SCHEDULE.GET}`, headers);

    const file = await Deno.open(filename, { create: true, write: true });

    try {
        const decompressionStream = new DecompressionStream('gzip');
        await response.body!.pipeThrough(decompressionStream).pipeTo(file.writable);
        return true;
    } catch (error) {
        console.error('Failed to decompress gzip data:', error);
    }

    return false;
}

export async function getScheduleDatabaseStream() {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const response = await fetchDataBinary(`${ENDPOINTS.SCHEDULE.GET}`, headers);

    try {
        const decompressionStream = new DecompressionStream('gzip');
        const decompressed = response.body!.pipeThrough(decompressionStream);
        return decompressed;
    } catch (error) {
        console.error('Failed to decompress gzip data:', error);
    }
}
