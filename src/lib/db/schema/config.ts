import type { DatabaseSchema, Row, ValuesToKeys } from '../../utils/types.ts';

export const CONFIG_TABLE = {
    __table__: 'CFG',
    __columns__: {
        NAME: 'name',
        VALUE: 'value',
    },
} as const satisfies DatabaseSchema;

export const _configSql = {
    name: 'lTripPlaner',
    value: 'N',
} satisfies Row<ValuesToKeys<typeof CONFIG_TABLE.__columns__>>;

export type ConfigSql = typeof _configSql;

const CONFIG_FLAG = {
    enabled: 'Y',
    disabled: 'N',
} as const;

export type ConfigFlag = (typeof CONFIG_FLAG)[keyof typeof CONFIG_FLAG];
export function convertConfigFlag(configFlag: string): boolean | undefined {
    if (configFlag === CONFIG_FLAG.enabled) return true;
    if (configFlag === CONFIG_FLAG.disabled) return false;

    return undefined;
}

export const KNOWN_CONFIG_KEYS = {
    TripPlannerEnabled: 'lTripPlaner',
    StreetsEnabled: 'lStreets',
    VehicleNotesEnabled: 'lVehicleNotes',
    VehicleSideNumberEnabled: 'lVehicleSideNumber',
    VehicleVarianceEnabled: 'lVehicleVariance',
    TripPlannerVersion: 'nTripPlanerVersion',
} as const;

export type ConfigContentSql = {
    lTripPlaner: ConfigFlag;
    lStreets: ConfigFlag;
    lVehicleNotes: ConfigFlag;
    lVehicleSideNumber: ConfigFlag;
    lVehicleVariance: ConfigFlag;
    nTripPlanerVersion: string;
};

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
