import type { ApiWrapper } from '../lib/api/wrapper.ts';
import { appendToJson, readNdjson } from '../lib/utils/files.ts';

export async function scrapeVehiclesOnlineToNdjson(path: string, api: ApiWrapper) {
    const date = Temporal.Now.instant().toJSON();
    const vehiclesOnline = await api.getOnlineVehicles();
    const data = vehiclesOnline.map((entry) => {
        return {
            date,
            ...entry,
        };
    });

    await appendToJson(path, data);
}

export async function convertScrapingToJson(path: string) {
    return await readNdjson(path);
}
