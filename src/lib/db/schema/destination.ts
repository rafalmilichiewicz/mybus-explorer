import { DatabaseSchema, Row, ValuesToKeys } from '../../utils/types.ts';
import { Stop } from './stop.ts';
import { RouteDirection, TransportMode } from './ztm-types.ts';

export const DESTINATIONS_TABLE = {
    __table__: 'KIERUNKI',
    __columns__: {
        ROUTE_NUMBER: 'numer',
        ROUTE_VARIANT: 'war_trasy',
        DESTINATION: 'opis_tabl',
        ROUTE_DIRECTION: 'kierunek',
        _DEFAULT_VARIANT: 'podstawowy', // TODO Check other cities - In Lublin all are "Default"
        TRANSPORT_MODE: 'transport',
        ROUTE: 'trasa',
        ROUTE_CODE: 'kod',
        ID: 'id_krn',
        _DESCRIPTION: 'opis2tabl', // TODO Check other cities
        _DESCRIPTION_NUMBER: 'lp_opis2tabl', // TODO Check other cities
    },
} as const satisfies DatabaseSchema;

export const _destinationSql = {
    numer: '160',
    war_trasy: 'A',
    opis_tabl: 'CHOINY',
    kierunek: 'P',
    podstawowy: 'T',
    transport: 'R',
    trasa: '570,518,516,532,530,418,395,384,386,387,362,358,356,354,334,342,330,328,1105,324,251,152,9,96,98,102,90,92,67,70,77,72,917,898,918',
    kod: 160,
    id_krn: 426545,
    opis2tabl: '',
    lp_opis2tabl: 0,
} satisfies Row<ValuesToKeys<typeof DESTINATIONS_TABLE.__columns__>>;

export type DestinationSql = typeof _destinationSql;

export type Route = {
    id: number;
    number: string;
    transportMode: TransportMode;
    direction: string;
    stops: Stop['idSip'][];
    variant: string;
    night: boolean;
    depot: boolean;
    routeKey: `${Route['number']}-${Route['variant']}`;
    routeDirection: RouteDirection;
    routeCode: number;
    _defaultVariant: unknown;
    _description: unknown;
    _descriptionNumber: unknown;
};
