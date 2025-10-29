---
title: Stops
---

This table stores stops info. There are many problems with this table or rather it's execution and data.

Column `transport` supposedly tells what type of stop it is. For example there are cities with trams only stops and this should represent that situation. But this column is not a "computed" it is hand populated. In Lublin there is one stop that is serviced by only trolleybuses `Zana Leclerc 02` but it is a "Bus stop". Similarly stop `Plac Litewski 01` is a "Tram stop", but there are no trams in Lublin...

Similarly `kierunek` holds a comma delimited string with destinations for given stop, but there is a catch. This should be a computed field - generated automatically based on already present data, but this thing is hand inserted. It has stores 2 values tops, so there is a data
loss, and the destinations are picked arbitrarily.

## Original Structure

```ts
export const _stopSql = {
    id: 520,
    id_ul: 104,
    nazwa: 'KRYSZTAŁOWA 02',
    numer: 5562,
    slupek: null,
    odjazdy: 1,
    lon: 22.49792,
    lat: 51.2248,
    transport: 'A',
    linieA: '14,57,303,N2',
    linieT: '',
    linieR: '150,161',
    sort: 547,
    kierunek: 'OS.PORĘBA, FELIN  UNIWERSYTET',
    typ_tab: 0,
};
```

## Parsed Type

```ts
export type Stop = {
    idSip: number;
    idZtm: number;
    streetId: Street['id'];
    streetName: Street['name'];
    order: number;
    description: string;
    groupName: string;
    groupNumber: string;
    longitude: number;
    latitude: number;
    routes: {
        bus: string[];
        tram: string[];
        trolleybus: string[];
    };
    destinations: string[];
    transportMode: string;
    _post?: unknown;
    _tabType?: unknown;
};
```
