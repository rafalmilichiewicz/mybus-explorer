---
title: Destinations
---

This table stores all routes and their variants with stops on a given route.

## Original Structure

```ts
export const _destinationSql = {
    numer: '160',
    war_trasy: 'A',
    opis_tabl: 'CHOINY',
    kierunek: 'P',
    podstawowy: 'T',
    transport: 'R',
    trasa: '570,518,516,532,530,418,395,384,386,387,362,358,356,354,334,342,330,328,1105,324,251,152,9,96,98,102,90,92,67,70,77,72,917,898,918',
    kod: 160,
    id_krn: 426545,
    opis2tabl: '',
    lp_opis2tabl: 0,
};
```

## Parsed Type

```ts
export type Route = {
    id: number;
    number: string;
    transportMode: TransportMode;
    direction: string;
    stops: Stop['idSip'][];
    variant: string;
    night: boolean;
    depot: boolean;
    routeKey: `${Route['number']}-${Route['variant']}`;
    routeDirection: RouteDirection;
    routeCode: number;
    _defaultVariant: unknown;
    _description: unknown;
    _descriptionNumber: unknown;
};
```
