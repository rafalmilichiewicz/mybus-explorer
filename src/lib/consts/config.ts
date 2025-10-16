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

function getCityInfoById(id: string): CityInfo {
    const city = Object.values(CITIES).find((el) => el.id === id);
    if (city) {
        return city;
    }

    throw new Error('City id not found');
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
    const OFFSET =
        envOffset !== undefined ? parseIntEnv(envOffset) : generateCityOffset(defaultCity.code);
    const AGE =
        envAge !== undefined
            ? parseIntEnv(envAge)
            : generateAgeHeader(generateCityOffset(defaultCity.code));
    const CITY_INFO: CityInfo =
        Deno.env.get(ENV_VARS.CITY.ID) !== undefined ? getCityInfoById(ID) : defaultCity;
    return {
        ID,
        OFFSET,
        AGE,
        CITY_INFO,
    };
}

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
