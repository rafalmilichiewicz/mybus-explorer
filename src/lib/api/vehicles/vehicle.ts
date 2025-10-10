import type { RouteDirection, TransportMode, VehicleFlag, VehicleStatus } from '../../db/schema/ztm-types.ts';
import type { Position } from '../../utils/types.ts';

const _example = {
    // Id of some sort
    // - sometimes vehicle's sideNumber
    // - sometimes long autoincementing
    // - definitely not unix timestamp
    'id': '24014', // ^
    'nb': '24014', // "Long" side number - vehicle id
    'nr': '25', // Route number
    'wt': 'B', // Route variant
    'kr': 'T', // Route direction (inbound/outbound/depot) T | P | Z
    'ik': '2085', // ? Current route Id
    'lp': '18', // Number of next stop on route (1 indexed)
    'dp': '768', // ?
    'dw': '935', // ?
    'x': '22.54847', // Longitude
    'y': '51.21101', // Latitude
    'px': '22.54848', // ? Possibly predicted location
    'py': '51.21103', // ?
    'o': '-90', // Delay - if positive advance else delay
    's': '1', // Vehicle status
    'p': '14:17', // Time of planned departure (from first stop)
    'op': 'PANCERNIAKÓW  FELICITY', // Current destination
    'c': 'BKN', // Feature/Icons - vehicle flags - AC / low-floor and such
    'nk': '2086', // ? Next route Id
    'nnr': '25', // Next route number
    'nwt': 'C', // Next route variant
    'nkr': 'P', // Next route direction
    'nop': 'PRAWIEDNIKI', // Next destination
    'is': '0',
    'vt': 'A', // Vehicle type - same as in db - A | R | T
    'kwi': '045/03', // Brigade `{Route}/{BrigadeNumber}`
};

const _shape = {
    'VL': {
        'V': [_example],
    },
};

export type VehicleApi = typeof _shape;

export type RouteInfo = {
    number: string;
    destination: string;
    variant: string;
    direction: RouteDirection;
    id: string;
};

export type VehicleEnRoute = {
    id: string;
    sideNumer: string;
    position: Position;
    _positionP: Position;
    status: VehicleStatus;
    currentRoute: RouteInfo;
    nextRoute: RouteInfo;
    delay: number;
    flags: VehicleFlag[];
    type: TransportMode;
    nextStopOnRouteIndex: number;
    brigade: string;
    plannedDepartureTime: string;
};
