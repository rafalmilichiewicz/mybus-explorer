import { DatabaseSchema, Row, SomeOtherNumber, ValuesToKeys } from '../../utils/types.ts';
// TODO Rename types
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

export const _salesPointSql = {
    id: 6001,
    nazwa: 'UL. DR. MĘCZENNIKÓW MAJDANKA 53, KIOSK',
    lon: 22.59397,
    lat: 51.22992,
    id_pktp: 5,
} satisfies Row<ValuesToKeys<typeof SALES_POINTS_TABLE.__columns__>>;

export type SalesPointSql = typeof _salesPointSql;

export type SalesPointDescription = {
    id: number;
    description: string;
};

export const SALES_POINT_TYPES = {
    ztm: {
        id: 1,
        description: 'Punkt sprzedaży ZTM',
    },
    lubika: {
        id: 2,
        description: 'Stacjonarny automat biletowy LUBIKA',
    },
    kiosk: {
        id: 5,
        description: 'Kiosk / punkt handlowy',
    },
    external: {
        id: 16,
        description: 'Zewnetrzny punkt sprzedazy dla turysty',
    },
    _unknown: {
        id: -1,
        description: 'Nieznany typ punktu sprzedaży',
    },
} as const satisfies Record<string, SalesPointDescription>;

export type SalePointTypes = keyof typeof SALES_POINT_TYPES;

export type UnknownSalesPointType = {
    [K in SalePointTypes]: (typeof SALES_POINT_TYPES)[K] extends { id: -1 } ? K : never;
}[SalePointTypes];

export type SalesPointTypeValid = keyof Omit<typeof SALES_POINT_TYPES, UnknownSalesPointType>;
export type SalePointTypeId = Exclude<
    (typeof SALES_POINT_TYPES)[SalePointTypes]['id'],
    typeof SALES_POINT_TYPES._unknown.id
>;

const SALES_POINT_TYPES_REV = {
    1: 'ztm',
    2: 'lubika',
    5: 'kiosk',
    16: 'external',
} satisfies Record<SalePointTypeId, SalesPointTypeValid>;

type SalesPointType = {
    id: SalePointTypeId | SomeOtherNumber;
    description: SalePointTypes;
};

export function getSalesPointType(salesPointId: number): SalesPointType {
    if (salesPointId in SALES_POINT_TYPES_REV) {
        const id = salesPointId as SalePointTypeId;
        return {
            id: id,
            description: SALES_POINT_TYPES_REV[id],
        };
    }
    return {
        id: salesPointId,
        description: '_unknown',
    };
}

export type SalesPoint = {
    id: number;
    name: string;
    type: SalesPointType;
    longitude: number;
    latitude: number;
};
