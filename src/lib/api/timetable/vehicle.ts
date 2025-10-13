import { TrackingStatus } from '../../db/schema/ztm-types.ts';

const _example = {
    lp: '32', // Stop number on route
    id: '515', // SIP id of stop
    name: 'BOCIANIA 01', // Stop full name
    th: '', // If no tracking available or departure is distant string of departure hour else empty
    // If no tracking available or departure is distant string of departure minute
    // Else string label of minutes <1 min / x min
    tm: '1 min',
    s: '88', // Estimated seconds to arrive
    m: '2', // Status
};

export type TimeTableVehicleStopApi = typeof _example;
export type TimeTableVehicleApi = {
    Schedules: {
        id: string; // ? id used for route-variant, but different from db
        nr: string; // Route number
        type: string; // Route variant
        o: string; // Route Destination
        Stop?: TimeTableVehicleStopApi | TimeTableVehicleStopApi[];
    };
};

export type VehicleStopInfo = {
    stop: {
        numberEnRoute: number;
        idSip: number;
        name: string;
    };
    time: {
        label: string;
        seconds: number;
    };
    status: TrackingStatus;
};

export type TimetableVehicle = {
    id: number;
    route: {
        number: string;
        variant: string;
        destination: string;
    };
    stops: VehicleStopInfo[];
};
