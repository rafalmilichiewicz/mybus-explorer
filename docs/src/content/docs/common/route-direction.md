---
title: Route Direction
---

## Inbound vs Outbound

When a route connects two points, like from terminus A to terminus B and back, we differentiate between `inbound` and `outbound` directions.

-   Outbound: Represents the route from A to B.
-   Inbound: Represents the route from B to A.

The determination of which direction is considered `inbound` or `outbound` is often a stylistic choice made by the city operator. Common conventions are:

-   Towards/Away from City Center: Routes towards the city center might be considered inbound, while those away are outbound.
-   To/From Depot: Routes to the depot might be outbound, and those from the depot might be inbound.

# Depot Run

A Depot Run occurs when a vehicle returns to its depot.

```ts
export const ROUTE_DIRECTION_TYPES = {
    outbound: 'T',
    inbound: 'P',
    depot: 'Z',
    _unknown: '',
} as const;
```
