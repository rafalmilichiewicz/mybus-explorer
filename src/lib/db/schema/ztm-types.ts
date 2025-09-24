export const VEHICLE_TYPES = {
    BUS: 'A',
    TRAM: 'T',
    TROLLEYBUS: 'R',
    _UNKNOWN: '',
} as const;

export type UnknownVehicleType = {
    [K in keyof typeof VEHICLE_TYPES]: (typeof VEHICLE_TYPES)[K] extends '' ? K : never;
}[keyof typeof VEHICLE_TYPES];

export type VehicleType = keyof typeof VEHICLE_TYPES;
export type VehicleTypeValid = keyof Omit<typeof VEHICLE_TYPES, UnknownVehicleType>;
export type VehicleTypeLetter = Exclude<
    (typeof VEHICLE_TYPES)[keyof typeof VEHICLE_TYPES],
    typeof VEHICLE_TYPES._UNKNOWN
>;

export const ROUTE_DIRECTION_TYPES = {
    OUTBOUND: 'T',
    INBOUND: 'P',
    DEPOT: 'Z',
    _UNKNOWN: '',
} as const;

export type UnknownRouteDirection = {
    [K in keyof typeof ROUTE_DIRECTION_TYPES]: (typeof ROUTE_DIRECTION_TYPES)[K] extends ''
        ? K
        : never;
}[keyof typeof ROUTE_DIRECTION_TYPES];

export type RouteDirectionType = keyof typeof ROUTE_DIRECTION_TYPES;
export type RouteDirectionTypeValid = keyof Omit<
    typeof ROUTE_DIRECTION_TYPES,
    UnknownRouteDirection
>;
export type RouteDirectionTypeLetter = Exclude<
    (typeof ROUTE_DIRECTION_TYPES)[keyof typeof ROUTE_DIRECTION_TYPES],
    typeof ROUTE_DIRECTION_TYPES._UNKNOWN
>;
