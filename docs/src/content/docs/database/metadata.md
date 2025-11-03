---
title: Metadata
---

This table holds metadata of schedule database.

## Original Structure

```ts
export const _metadataSql = {
    id_wersja: 4563,
    wazna_od: '2025-09-01',
    generacja: 1,
};
```

## Parsed Type

```ts
export type ScheduleMetadata = {
    validFrom: string;
    version: number;
    generation: number;
};
```
