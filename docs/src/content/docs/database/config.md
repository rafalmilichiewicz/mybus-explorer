---
title: Config
---

This table stores configuration of features enabled by city.

## Original Structure

```ts
export const _configSql = {
    name: 'lTripPlaner',
    value: 'N',
};

const CONFIG_FLAG = {
    enabled: 'Y',
    disabled: 'N',
} as const;

export type ConfigContentSql = {
    lTripPlaner: ConfigFlag;
    lStreets: ConfigFlag;
    lVehicleNotes: ConfigFlag;
    lVehicleSideNumber: ConfigFlag;
    lVehicleVariance: ConfigFlag;
    nTripPlanerVersion: string;
};
```

## Parsed Type

```ts
export const KNOWN_CONFIG_KEYS = {
    TripPlannerEnabled: 'lTripPlaner',
    StreetsEnabled: 'lStreets',
    VehicleNotesEnabled: 'lVehicleNotes',
    VehicleSideNumberEnabled: 'lVehicleSideNumber',
    VehicleVarianceEnabled: 'lVehicleVariance',
    TripPlannerVersion: 'nTripPlanerVersion',
} as const;



export type Config = {
    TripPlannerEnabled: boolean;
    TripPlannerVersion: string;
    StreetsEnabled: boolean;
    VehicleNotesEnabled: boolean;
    VehicleSideNumberEnabled: boolean;
    VehicleVarianceEnabled: boolean;
    _others: {
        [key: string]: string | undefined;
    };
};
```
