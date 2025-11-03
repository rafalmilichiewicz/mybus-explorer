---
title: Sales Points
---

This table holds information and locations of sales points. Description types were taken from Lublika's website.

## Original Structure

```ts
export const _salesPointSql = {
    id: 6001,
    nazwa: 'UL. DR. MĘCZENNIKÓW MAJDANKA 53, KIOSK',
    lon: 22.59397,
    lat: 51.22992,
    id_pktp: 5,
};
```

## Parsed Type

```ts
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

export type SalesPoint = {
    id: number;
    name: string;
    type: SalesPointType;
    position: Position;
};
```
