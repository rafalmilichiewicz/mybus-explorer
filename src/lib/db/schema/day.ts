import { DatabaseSchema, Row, ValuesToKeys } from '../../utils/types.ts';

export const DAYS_TABLE = {
    __table__: 'DNI',
    __columns__: {
        TYPE: 'typ_dnia',
        DESCRIPTION: 'opis_dnia',
        ORDER: 'kolej_wydr',
    },
} as const satisfies DatabaseSchema;

export const _daySql = {
    typ_dnia: 'PN',
    opis_dnia: 'Dzień Powszedni',
    kolej_wydr: 1,
} satisfies Row<ValuesToKeys<typeof DAYS_TABLE.__columns__>>;

export type DaySql = typeof _daySql;

export type Day = {
    type: string;
    description: string;
    /**
     * Order in which each day type should be displayed in Departure Table
     *
     * See example of https://zdtm.lublin.eu/pl/rozklady/1562/160
     */
    displayOrder: number;
};
