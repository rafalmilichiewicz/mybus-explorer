import Stream from "node:stream";
import { ENDPOINTS } from '../consts/endpoints.ts';
import { LUBLIN_AGE } from '../consts/magic-numbers.ts';
import generateHeaders from '../token/header.ts';
import fetchDataBinary from '../xml/fetch-data-binary.ts';

// @ts-types="node:sqlite"
import { DatabaseSync } from 'node:sqlite';
import { buffer } from "node:stream/consumers";

export async function getSchedule(filename: string) {
    const headers = await generateHeaders(LUBLIN_AGE);
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
