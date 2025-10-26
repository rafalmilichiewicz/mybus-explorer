import { generateAgeHeader } from '../api/token/age.ts';
import generateCityOffset from '../api/token/city-offset.ts';
import { CITIES, type CityInfo } from './cities.ts';
import { ENV_VARS } from './env_vars.ts';

function parseIntEnv(value: string): number | never {
    const numericValue = Number.parseInt(value);
    if (Number.isNaN(numericValue)) {
        throw new Error('Passed environment value was not an integer');
    }
    return numericValue;
}

function parseBooleanEnv(value: string): boolean | never {
    const normalized = value.toLowerCase().trim();

    if (normalized === 'true' || normalized === '1') {
        return true;
    }

    if (normalized === 'false' || normalized === '0') {
        return false;
    }

    throw new Error(`Cannot convert "${value}" to boolean`);
}

function getCityInfoById(id: string): CityInfo | undefined {
    const city = Object.values(CITIES).find((el) => el.id === id);
    if (city) {
        return city;
    }
}

// Preserve the shape of type, but allow for values to be of any other type
type EnvVarValues<T> = {
    [K in keyof T]: T[K] extends Record<string, string> ? { [P in keyof T[K]]: unknown } : unknown;
};

const defaultCity = CITIES.LUBLIN;

function getCityEnvInfo() {
    const envOffset = Deno.env.get(ENV_VARS.CITY.OFFSET);
    const envAge = Deno.env.get(ENV_VARS.CITY.AGE);
    const ID = Deno.env.get(ENV_VARS.CITY.ID) ?? defaultCity.id;

    const currentCity = getCityInfoById(ID);
    if (!currentCity) {
        throw new Error('Passed city ID is not valid');
    }

    const OFFSET =
        envOffset !== undefined ? parseIntEnv(envOffset) : generateCityOffset(currentCity.code);
    const AGE =
        envAge !== undefined
            ? parseIntEnv(envAge)
            : generateAgeHeader(generateCityOffset(currentCity.code));
    const CITY_INFO: CityInfo = currentCity;
    const BASE_URL =
        Deno.env.get(ENV_VARS.CITY.BASE_URL) !== undefined
            ? Deno.env.get(ENV_VARS.CITY.BASE_URL)
            : currentCity.url;
    return {
        ID,
        OFFSET,
        AGE,
        CITY_INFO,
        BASE_URL,
    };
}

export const CONFIG = {
    API: {
        USER_AGENT: Deno.env.get(ENV_VARS.API.USER_AGENT) ?? 'myBusOnline',
    },
    CONFIG: {
        TIME_ZONE: Deno.env.get(ENV_VARS.CONFIG.TIME_ZONE) ?? 'Europe/Warsaw',
    },
    CITY: getCityEnvInfo(),
    SERVER: {
        PORT:
            Deno.env.get(ENV_VARS.SERVER.PORT) !== undefined
                ? parseIntEnv(Deno.env.get(ENV_VARS.SERVER.PORT) as string)
                : 8069,
        STANDALONE:
            Deno.env.get(ENV_VARS.SERVER.STANDALONE) !== undefined
                ? parseBooleanEnv(Deno.env.get(ENV_VARS.SERVER.STANDALONE) as string)
                : false,
    },
} as const satisfies EnvVarValues<typeof ENV_VARS>;

export type Config = typeof CONFIG;
