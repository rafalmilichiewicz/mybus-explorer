import { DatabaseSchema, Row, ValuesToKeys } from "../../utils/types.ts";
import { Day } from "./day.ts";

export const CALENDAR_TABLE = {
    __table__: 'KALENDARZ',
    __columns__: {
        TYPE: 'td_rj',
        DATE: 'dt_kal',
    },
} as const satisfies DatabaseSchema;

export const _calendarSql = {
    td_rj: 'PN',
    dt_kal: '2025-09-01 00:00:00',
} satisfies Row<ValuesToKeys<typeof CALENDAR_TABLE.__columns__>>;

export type Calendar = {
    dayType: Day['type'];
    date: Date;
};