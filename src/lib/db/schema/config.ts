import { DatabaseSchema, Row, ValuesToKeys } from "../../utils/types.ts";

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

export type ConfigFlag = 'N' | 'Y';

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
    TripPlannerVersion: boolean;
    Streets: boolean;
    VehicleNotes: boolean;
    VehicleVariance: boolean;
};
