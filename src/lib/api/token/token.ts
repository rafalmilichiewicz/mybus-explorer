import { CONFIG } from '../../consts/config.ts';
import { ENDPOINTS } from '../../consts/endpoints.ts';
import { fetchDataXml } from '../requests/fetch.ts';

export type ResponsePing = {
    int: number;
};

export type ZTM_Headers = {
    'Age': string;
    'User-Agent': string;
    'Accept-Encoding'?: string;
    'Accept-Language'?: string;
};

export default async function generateToken(ageHeader: number) {
    const ping = await fetchDataXml<ResponsePing>(ENDPOINTS.PING_SERVICE, {
        'Age': `${ageHeader}`,
        'User-Agent': CONFIG.API.USER_AGENT,
    });

    return ping.int;
}
