import { ZTM_Headers } from '../token/token.ts';
import { fetchBase } from './fetch-base.ts';

export default async function fetchDataBinary(url: string, headers: ZTM_Headers) {
    const response = await fetchBase(url, {
        ...headers,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'pl-PL,pl;q=0.9',
    });

    if (!response.body) {
        throw new Error('Schedule is empty');
    }

    return response;
}
