---
title: Days
---

This table stores types of days used in a given schedule.

## Original Structure

```ts
export const _daySql = {
    typ_dnia: 'PN',
    opis_dnia: 'Dzień Powszedni',
    kolej_wydr: 1,
};
```

## Parsed Type

```ts
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
```
