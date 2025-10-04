import { SomeOtherString } from '../../utils/types.ts';

export const VEHICLE_TYPES = {
    bus: 'A',
    tram: 'T',
    trolleybus: 'R',
    _unknown: '',
} as const;

export type UnknownVehicleType = {
    [K in keyof typeof VEHICLE_TYPES]: (typeof VEHICLE_TYPES)[K] extends '' ? K : never;
}[keyof typeof VEHICLE_TYPES];

export type VehicleType = keyof typeof VEHICLE_TYPES;
export type VehicleTypeValid = keyof Omit<typeof VEHICLE_TYPES, UnknownVehicleType>;
export type VehicleTypeLetter = Exclude<
    (typeof VEHICLE_TYPES)[keyof typeof VEHICLE_TYPES],
    typeof VEHICLE_TYPES._unknown
>;

export const VEHICLE_TYPES_REV = {
    A: 'bus',
    T: 'tram',
    R: 'trolleybus',
} as const satisfies Record<VehicleTypeLetter, VehicleType>;
export type TransportMode = {
    id: VehicleTypeLetter | SomeOtherString;
    type: VehicleType;
};

export function getVehicleType(typeCode: string): TransportMode {
    if (typeCode in VEHICLE_TYPES_REV) {
        const letter = typeCode as VehicleTypeLetter;
        return {
            id: letter,
            type: VEHICLE_TYPES_REV[letter],
        };
    }

    return {
        id: typeCode,
        type: '_unknown',
    };
}

export const ROUTE_DIRECTION_TYPES = {
    outbound: 'T',
    inbound: 'P',
    depot: 'Z',
    _unknown: '',
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
    typeof ROUTE_DIRECTION_TYPES._unknown
>;

export const ROUTE_DIRECTION_TYPES_REV = {
    T: 'outbound',
    P: 'inbound',
    Z: 'depot',
} satisfies Record<RouteDirectionTypeLetter, RouteDirectionType>;

export type RouteDirection = {
    id: RouteDirectionTypeLetter | SomeOtherString;
    type: RouteDirectionType;
};

export function getRouteDirectionType(routeCode: string): RouteDirection {
    if (routeCode in ROUTE_DIRECTION_TYPES_REV) {
        const letter = routeCode as RouteDirectionTypeLetter;
        return {
            id: letter,
            type: ROUTE_DIRECTION_TYPES_REV[letter],
        };
    }

    return {
        id: routeCode,
        type: '_unknown',
    };
}
