---
title: Schedule download
sidebar:
    order: 3
---

## Endpoint

```
${BASE}/GetScheduleFile
```

## Logic

Data returned by this endpoint is gzip-ed SQLite database. 

:::tip
Use `Schedule` and `ScheduleDatabase` classes to interact with this file
:::

:::note
This file refers to [`Common Types`](../../../common)
:::