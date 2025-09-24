import { ZTM_Headers } from "../token/token.ts";

export async function fetchBase(url: string, headers: ZTM_Headers) {
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