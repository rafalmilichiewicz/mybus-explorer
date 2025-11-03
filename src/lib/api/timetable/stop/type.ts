// This API call is mainly used for the purposes of displaying departures
// Example of it being a Information display board like this
// http://www.rg.com.pl/oferta/urzadzenia/tablice-informacyjne/dworcowe-przystankowe-peronowe,150.html
// Or in a web form
// https://sip.ztm.lublin.eu/RTT.aspx?id=469

import type { DepartureTime } from '../../../db/schema/departure.ts';
import type {
    RouteDirection,
    TrackingStatus,
    TransportMode,
    VehicleFlag,
} from '../../../db/schema/ztm-types.ts';

const _example = {
    i: '6350', // ? id
    di: '428422', // Database destination id
    n: '30949', // Vehicle Side Number if No Vehicle is assigned to route it is 0
    t: '60420', // Estimated arrival time in seconds since midnight
    r: '151', // Route number
    d: 'ABRAMOWICE', // Route destination
    dd: 'P', // Route direction (inbound/outbound/depot) T | P | Z
    p: 'R', //  Transport Mode
    kn: '' as unknown, // ? Possibly notice based on similar field in RTT.aspx timetable
    vr: '3149', // Estimated seconds for vehicle to arrive
    m: '3', // Status 1 - vehicle in stop area, 2 - GPS available, 3 - No vehicle assigned (scheduled time only)
    v: '16:47', // Time to arrive at the stop <1 min / x min / HH:mm
    vn: 'NBK', // Vehicle flags empty string if no vehicle assigned
    iks: '10077934', // ? id of specific combination route-stop-dayType
};

const _shapeBase = {
    Departures: {
        N: '' as unknown,
        time: '15:54',
        i: '1',
    },
};

export type TimeTableStopDepartureApi = typeof _example;
export type TimetableStopApi = {
    Departures: {
        N: unknown; // ? Possibly special notices
        time: string; // Current time
        i: string; // Stop id SIP
        D?: TimeTableStopDepartureApi | TimeTableStopDepartureApi[];
    };
};

export type StopDepartureInfo = {
    id: string;
    estimatedDeparture: {
        time: DepartureTime;
        seconds: number;
        label: string;
    };
    trackingStatus: TrackingStatus;
    destination: string;
    route: {
        number: string;
        direction: RouteDirection;
        id: string;
    };
    vehicle: {
        sideNumber: string;
        type: TransportMode;
        flags: VehicleFlag[];
    };
};

export type TimetableStop = {
    stopIdSip: number;
    currentTime: string;
    departures: StopDepartureInfo[];
};
