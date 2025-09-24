/**
 * Each city in R&G's system has a unique *code*.
 *
 * This code is used in generating `cityOffset`.
 *
 **/
export const CITY_CODES = {
    LUBLIN: 'LUBLI',
} as const;

export type CityCode = (typeof CITY_CODES)[keyof typeof CITY_CODES];
export type City = keyof typeof CITY_CODES;
