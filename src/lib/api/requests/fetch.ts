import type { ZTM_Headers } from '../token/token.ts';
import parseXml from './parseXml.ts';

async function fetchBase(url: string, headers: ZTM_Headers) {
    console.log(headers);
    const response = await fetch(url, {
        headers,
    });

    if (!response.ok) {
        throw new Error(
            `Error while accessing endpoint: ${url} \n${response.status}\n${response.statusText}`
        );
    }

    return response;
}

export async function fetchDataBinary(url: string, headers: ZTM_Headers) {
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

export default async function fetchDataXml<T>(url: string, headers: ZTM_Headers) {
    const response = await fetchBase(url, headers);
    const responseBody = await response.text();
    const parsedResponse = parseXml(responseBody);

    console.log(responseBody, parsedResponse);

    return parsedResponse as T;
}
