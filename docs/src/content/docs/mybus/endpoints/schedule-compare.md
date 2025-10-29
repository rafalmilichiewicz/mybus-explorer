---
title: Schedule comparison
sidebar:
    order: 4
---

## Endpoint

```
${BASE}/CompareScheduleFile
```

## Logic

In database there is metadata that can be used to check if downloaded schedule is still current. It returns `0` if schedule is current and `1` if it changed.

## Params

-   `nGeneracja` - Generation of schedule file from `metadata`
-   `nIdWersja` - Version of schedule file from `metadata`

## API Response Type

```ts
// True if schedule changed
// False if not
export type ResponseCompareSchedule = {
    int: 0 | 1;
};
```
