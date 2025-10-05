import { DatabaseSchema, SomeOtherString, Row, ValuesToKeys } from '../../utils/types.ts';
import { Day } from './day.ts';
import { Route } from './destination.ts';
import { Stop } from './stop.ts';

export const DEPARTURES_TABLE = {
    __table__: 'ODJAZDY',
    __columns__: {
        STOP_ID: 'bus_stop_id',
        DAY_TYPE: 'typ_dnia',
        LINE_NUMBER: 'numer_lini',
        ROUTE_VARIANT: 'war_trasy',
        DEPARTURES: 'odjazdy',
        DESTINATION_ID: 'id_krn',
        STOP_NUMBER_ON_ROUTE: 'lp_przyst',
    },
} as const satisfies DatabaseSchema;

export type HH = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`;
export type MM = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;
export type TimeString = `${HH}:${MM}`;

export type DepartureTime = {
    seconds: number;
    hour: number;
    minute: number;
    label: TimeString | SomeOtherString; // TODO ?
};

// TODO Docs
export const _departureSql = {
    typ_dnia: 'PN',
    war_trasy: 'A',
    id_krn: 426545,
    bus_stop_id: 570,
    numer_lini: '160',
    odjazdy:
        '18120,,19920,,21540,,22440,,23340,,24180,,25080,,25980,,26880,,27780,,28680,,29580,,30720,,32520,,34320,,36120,,37920,,39720,,41520,,43320,,45120,,46920,,48720,,49620,,50520,,51420,,52320,,53220,,54120,,55020,,55920,,56820,,57720,,58800,,60780,,62580,,64380,,66180,,67980,,69780,,71640,,73440,,75300,,77100,,78900,,80700,',
    lp_przyst: 1,
} satisfies Row<ValuesToKeys<typeof DEPARTURES_TABLE.__columns__>>;

export type DepartureSql = typeof _departureSql;

export function splitDeparturesString(departuresString: string) {
    return departuresString.split(',').filter((str) => str.length > 0);
}

export function toDepartureTime(timeString: string): DepartureTime {
    // timeString = seconds
    // 18120 => 05:02 (24-hour clock)
    // Label
    const seconds = Number.parseInt(timeString);

    if (Number.isNaN(seconds)) {
        throw new Error('Passed time string is not valid');
    }

    const totalMinutes = Math.floor(seconds / 60);
    const hour = Math.floor(totalMinutes / 60) % 24; // 24-hour format
    const minute = totalMinutes % 60;

    // Format into "HH:MM" ensuring zero padding
    const label = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}` as TimeString;

    const departureTime: DepartureTime = {
        seconds,
        hour,
        minute,
        label,
    };

    return departureTime;
}

export type Departure = {
    destinationId: Route['id'];
    dayType: Day['type'];
    routeVariant: Route['variant'];
    stopIdSip: Stop['idSip'];
    stopNumberOnRoute: number;
    lineNumber: Route['number'];
    departureTimes: DepartureTime[];
};
