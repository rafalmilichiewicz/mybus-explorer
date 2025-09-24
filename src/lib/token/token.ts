import { ENDPOINTS } from '../consts/endpoints.ts';
import { USER_AGENT } from '../consts/magic-numbers.ts';
import fetchDataXml from '../xml/fetch-data-xml.ts';

export type ResponsePing = {
    int: number;
};

export type ZTM_Headers = {
    'Age': string;
    'User-Agent': string;
    "Accept-Encoding"?: string,
    "Accept-Language"?: string,
};

export default async function generateToken(ageHeader: number) {
    const ping = await fetchDataXml<ResponsePing>(ENDPOINTS.PING_SERVICE, {
        'Age': `${ageHeader}`,
        'User-Agent': USER_AGENT,
    });

    return ping.int;
}
