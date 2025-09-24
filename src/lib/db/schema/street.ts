import { DatabaseSchema, Row, ValuesToKeys } from "../../utils/types.ts";

export const STREETS_TABLE = {
    __table__: 'ULICE',
    __columns__: {
        ID: 'id',
        NAME: 'nazwa',
    },
} as const satisfies DatabaseSchema;

export const _streetSql = {
    id: 1,
    nazwa: 'LIPOWA',
} satisfies Row<ValuesToKeys<typeof STREETS_TABLE.__columns__>>;

export type StreetSql = typeof _streetSql;

export type Street = {
    id: number;
    name: string;
};
