import { generateAgeHeader } from '../api/token/age.ts';
import generateCityOffset from '../api/token/city-offset.ts';
import { CITIES } from './cities.ts';
import { ENV_VARS } from './env_vars.ts';

function parseIntEnv(value: string): number | never {
    const numericValue = Number.parseInt(value);
    if (Number.isNaN(numericValue)) {
        throw new Error('Passed environment value was not an integer');
    }
    return numericValue;
}

// Preserve the shape of type, but allow for values to be of any other type
type EnvVarValues<T> = {
    [K in keyof T]: T[K] extends Record<string, string> ? { [P in keyof T[K]]: unknown } : unknown;
};

const defaultCity = CITIES.LUBLIN;

export const CONFIG = {
    API: {
        BASE_URL: Deno.env.get(ENV_VARS.API.BASE_URL) ?? CITIES.LUBLIN.url,
        USER_AGENT: Deno.env.get(ENV_VARS.API.USER_AGENT) ?? 'myBusOnline',
    },
    CONFIG: {
        TIME_ZONE: Deno.env.get(ENV_VARS.CONFIG.TIME_ZONE) ?? 'Europe/Warsaw',
    },
    // TODO Add parsing (No CITY.CODE => Lublin else CITY.CODE present => Compute)
    // Currently assumes (No value => Lublin)
    CITY: {
        CODE: Deno.env.get(ENV_VARS.CITY.CODE) ?? defaultCity.code,
        OFFSET:
            Deno.env.get(ENV_VARS.CITY.OFFSET) !== undefined
                ? parseIntEnv(Deno.env.get(ENV_VARS.CITY.OFFSET) as string)
                : generateCityOffset(defaultCity.code),
        AGE:
            Deno.env.get(ENV_VARS.CITY.AGE) !== undefined
                ? parseIntEnv(Deno.env.get(ENV_VARS.CITY.AGE) as string)
                : generateAgeHeader(generateCityOffset(defaultCity.code)),
    },
} as const satisfies EnvVarValues<typeof ENV_VARS>;
