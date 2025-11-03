---
title: Vehicle Status
---

This is only a speculation based on observation of API responses and mobile app behavior.

```ts
const VEHICLE_STATUSES = {
    EN_ROUTE_STATIONARY: 1,
    EN_ROUTE_MOVING: 2,
    AWAITING_STATIONARY: 6,
    AWAITING_MOVING: 7,
    _unknown: -1,
} as const;
```
