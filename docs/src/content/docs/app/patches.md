---
title: Patches
sidebar:
    badge: 
        text: WIP
        variant: caution
---

By modifying `patches.json` it is possible to fix small things in schedule database.

Empty `patches.json` file looks like this

```json
// patches.json
{
    "$schema": "../../../schema.json",
    "routes": {
        "patches": []
    },
    "stops": {
        "include": [],
        "patches": []
    }
}
```

## Route Patches

Routes can be patched by specifying either their `number` or `id`.

```ts
type RoutePatchByNumber = {
    number: Route['number'][];
    patch: Partial<Route>;
};

type RoutePatchById = {
    id: Route['id'];
    patch: Partial<Route>;
};
export type RoutePatch = RoutePatchByNumber | RoutePatchById;
```

## Stop patches

Stops can be patched by specifying their `idSip`.

```ts
export type StopPatch = {
    id: Stop['idSip'];
    patch: Partial<Stop>;
};
```

:::danger
Right now force inclusion of stop and patching is not implemented.
:::

## Patch Behavior

Patches are cumulative. Take the following example.

```json
// patches.json
{
    "$schema": "../../../schema.json",
    "routes": {
        "patches": [
            {
                "number": ["950", "Zie", "Bia"],
                "patch": {
                    "depot": true
                }
            },
            {
                "number": ["950", "160"],
                "patch": {
                    "transportMode": { "id": "R", "type": "trolleybus" }
                }
            }
        ]
    },
    "stops": {
        "include": [],
        "patches": []
    }
}
```

Route `950` would now be depot trolleybus route.
