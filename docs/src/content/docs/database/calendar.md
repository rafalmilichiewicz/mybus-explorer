---
title: Calendar
---

This table serves as a lookup table to determine what is the type for each date.

## Original Structure

```ts
export const _calendarSql = {
    td_rj: 'PN',
    dt_kal: '2025-09-01 00:00:00',
};
```

## Parsed Type

```ts
export type CalendarEntry = {
    dayType: Day['type'];
    date: Temporal.PlainDate;
};
```
