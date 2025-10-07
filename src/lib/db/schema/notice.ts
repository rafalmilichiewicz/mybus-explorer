import type { DatabaseSchema, Row, ValuesToKeys } from '../../utils/types.ts';
import type { Route } from './destination.ts';

export const NOTICES_TABLE = {
    __table__: 'UWAGI',
    __columns__: {
        LINE_NUMBER: 'numer_linii',
        TYPE: 'ozn_uwagi',
        CONTENT: 'tresc_uwag',
    },
} as const satisfies DatabaseSchema;

// TODO Check other cities to populate example
export const _noticeSql = {
    numer_linii: '',
    ozn_uwagi: '',
    tresc_uwag: '',
} satisfies Row<ValuesToKeys<typeof NOTICES_TABLE.__columns__>>;

export type NoticeSql = typeof _noticeSql;

export type Notice = {
    routeNumber: Route['number'];
    name: string;
    content: string;
};
