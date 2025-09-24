import { ZTM_Headers } from "../token/token.ts";
import { fetchBase } from "./fetch-base.ts";
import parseXml from './parse.ts';

export default async function fetchDataXml<T>(url: string, headers: ZTM_Headers) {
    
    const response = await fetchBase(url, headers);
    const responseBody = await response.text();
    const parsedResponse = parseXml(responseBody);

    console.log(responseBody, parsedResponse);

    return parsedResponse as T;
}