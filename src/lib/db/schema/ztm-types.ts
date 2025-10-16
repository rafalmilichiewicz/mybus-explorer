import type { SomeOtherNumber, SomeOtherString } from '../../utils/types.ts';

// TODO move to utils and rename

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

// TODO Add docs that state when modes are involved they will be in this order exactly
export const TRANSPORT_MODES = ['bus', 'tram', 'trolleybus'] as const satisfies VehicleTypeValid[];

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
} satisfies Record<RouteDirectionTypeLetter, RouteDirectionTypeValid>;

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

export const VEHICLE_FEATURES = {
    accessibility: 'N',
    air_conditioning: 'K',
    bicycle: 'R',
    card_payments: 'Z',
    electric: 'E',
    ticket_machine: 'B',
    _unknown: '',
} as const;

export type UnknownVehicleFeature = {
    [K in keyof typeof VEHICLE_FEATURES]: (typeof VEHICLE_FEATURES)[K] extends '' ? K : never;
}[keyof typeof VEHICLE_FEATURES];
export type VehicleFeature = keyof typeof VEHICLE_FEATURES;
export type VehicleFeatureValid = keyof Omit<typeof VEHICLE_FEATURES, UnknownVehicleFeature>;
export type VehicleFeatureLetter = Exclude<
    (typeof VEHICLE_FEATURES)[keyof typeof VEHICLE_FEATURES],
    typeof VEHICLE_TYPES._unknown
>;

export const VEHICLE_FEATURES_REV = {
    N: 'accessibility',
    K: 'air_conditioning',
    R: 'bicycle',
    Z: 'card_payments',
    E: 'electric',
    B: 'ticket_machine',
} as const satisfies Record<VehicleFeatureLetter, VehicleFeature>;

export type VehicleFlag = {
    id: VehicleFeatureLetter | SomeOtherString;
    feature: VehicleFeature;
};
export function getVehicleFlags(featuresString: string): VehicleFlag[] {
    const flags: VehicleFlag[] = [];
    for (const char of featuresString) {
        if (char in VEHICLE_FEATURES_REV) {
            const feature = char as VehicleFeatureLetter;
            flags.push({
                id: feature,
                feature: VEHICLE_FEATURES_REV[feature],
            });
        } else {
            flags.push({
                id: char,
                feature: '_unknown',
            });
        }
    }

    return flags;
}

const VEHICLE_STATUSES = {
    EN_ROUTE_STATIONARY: 1,
    EN_ROUTE_MOVING: 2,
    AWAITING_STATIONARY: 6,
    AWAITING_MOVING: 7,
    _unknown: -1,
} as const;
export type UnknownVehicleStatus = {
    [K in keyof typeof VEHICLE_STATUSES]: (typeof VEHICLE_STATUSES)[K] extends -1 ? K : never;
}[keyof typeof VEHICLE_STATUSES];
export type VehicleStatusCode = keyof typeof VEHICLE_STATUSES;
export type VehicleStatusValid = keyof Omit<typeof VEHICLE_STATUSES, UnknownVehicleFeature>;
export type VehicleStatusNumber = Exclude<
    (typeof VEHICLE_STATUSES)[keyof typeof VEHICLE_STATUSES],
    typeof VEHICLE_STATUSES._unknown
>;
const VEHICLE_STATUSES_REV = {
    1: 'EN_ROUTE_STATIONARY',
    2: 'EN_ROUTE_MOVING',
    6: 'AWAITING_STATIONARY',
    7: 'AWAITING_MOVING',
} as const satisfies Record<VehicleStatusNumber, VehicleStatusCode>;

export type VehicleStatus = {
    id: number;
    flags?: {
        moving: boolean;
        enRoute: boolean;
    };
};

export function getVehicleStatus(statusNumber: number): VehicleStatus {
    if (statusNumber in VEHICLE_STATUSES_REV) {
        const status = statusNumber as VehicleStatusNumber;
        return {
            id: status,
            flags: {
                moving: status === 2 || status === 7 ? true : false,
                enRoute: status === 1 || status === 6 ? true : false,
            },
        };
    }

    return {
        id: statusNumber,
    };
}

const TRACKING_STATUS = {
    WITHIN_STOP_AREA: 1,
    GPS_TRACKING: 2,
    NO_TRACKING: 3,
    _unknown: -1,
} as const;

export type UnknownTrackingStatus = {
    [K in keyof typeof TRACKING_STATUS]: (typeof TRACKING_STATUS)[K] extends -1 ? K : never;
}[keyof typeof TRACKING_STATUS];
export type TrackingStatusCode = keyof typeof TRACKING_STATUS;
export type TrackingStatusValid = keyof Omit<typeof TRACKING_STATUS, UnknownTrackingStatus>;
export type TrackingStatusNumber = Exclude<
    (typeof TRACKING_STATUS)[keyof typeof TRACKING_STATUS],
    typeof TRACKING_STATUS._unknown
>;

const TRACKING_STATUS_REV = {
    1: 'WITHIN_STOP_AREA',
    2: 'GPS_TRACKING',
    3: 'NO_TRACKING',
} as const satisfies Record<TrackingStatusNumber, TrackingStatusCode>;

export type TrackingStatus = {
    id: TrackingStatusNumber | SomeOtherNumber;
    status: TrackingStatusCode;
};

export function getTrackingStatus(statusNumber: number): TrackingStatus {
    if (statusNumber in TRACKING_STATUS_REV) {
        const status = statusNumber as TrackingStatusNumber;
        return {
            id: status,
            status: TRACKING_STATUS_REV[status],
        };
    }

    return {
        id: statusNumber,
        status: '_unknown',
    };
}
