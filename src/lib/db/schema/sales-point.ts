import { DatabaseSchema, Row, ValuesToKeys } from '../../utils/types.ts';

export const SALES_POINTS_TABLE = {
    __table__: 'PUNKTY',
    __columns__: {
        ID: 'id',
        NAME: 'nazwa',
        LONGITUDE: 'lon',
        LATITUDE: 'lat',
        TYPE: 'id_pktp',
    },
} as const satisfies DatabaseSchema;

export type SalesPointType = {
    id: number;
    description: string;
};

export const SALES_POINT_TYPES = {
    ZTM: {
        id: 1,
        description: 'Punkt sprzedaży ZTM',
    },
    LUBIKA: {
        id: 2,
        description: 'Stacjonarny automat biletowy LUBIKA',
    },
    KIOSK: {
        id: 5,
        description: 'Kiosk / punkt handlowy',
    },
    EXTERNAL: {
        id: 16,
        description: 'Zewnetrzny punkt sprzedazy dla turysty',
    },
    _UNKNOWN: {
        id: -1,
        description: 'Nieznany typ punktu sprzedaży',
    },
} as const satisfies Record<string, SalesPointType>;

export function toSalesPointType(id: number) {
    const foundSalesPoint = Object.values(SALES_POINT_TYPES)
        .filter((s) => s.id !== SALES_POINT_TYPES._UNKNOWN.id)
        .find((salesPoint) => salesPoint.id === id);

    foundSalesPoint ? foundSalesPoint : SALES_POINT_TYPES._UNKNOWN;
}

export type SalePointType = keyof typeof SALES_POINT_TYPES;
export type SalePointTypeId = Exclude<
    (typeof SALES_POINT_TYPES)[keyof typeof SALES_POINT_TYPES]['id'],
    typeof SALES_POINT_TYPES._UNKNOWN.id
>;

export const _salesPointSql = {
    id: 6001,
    nazwa: 'UL. DR. MĘCZENNIKÓW MAJDANKA 53, KIOSK',
    lon: 22.59397,
    lat: 51.22992,
    id_pktp: 5,
} satisfies Row<ValuesToKeys<typeof SALES_POINTS_TABLE.__columns__>>;

export type SalesPointSql = typeof _salesPointSql;

export type SalesPoint = {
    id: number;
    name: string;
    type: SalesPointType;
};
