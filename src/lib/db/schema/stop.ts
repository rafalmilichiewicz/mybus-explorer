import type { DatabaseSchema, Position, Row, ValuesToKeys } from '../../utils/types.ts';
import type { Street } from './street.ts';

export const STOPS_TABLE = {
    __table__: 'PRZYSTANKI',
    __columns__: {
        ID_SIP: 'id',
        STREET_ID: 'id_ul',
        NAME: 'nazwa',
        ID_ZTM: 'numer',
        _POST: 'slupek',
        DEPARTURES: 'odjazdy',
        LONGITUDE: 'lon',
        LATITUDE: 'lat',
        TRANSPORT_MODE: 'transport',
        ROUTES_BUS: 'linieA',
        ROUTES_TRAM: 'linieT',
        ROUTES_TROLLEYBUS: 'linieR',
        ORDER: 'sort',
        DESTINATIONS: 'kierunek',
        _TAB_TYPE: 'typ_tab', // typ_tab ?= typ taboru
        //// => 18m bus (Articulated) / 12m (Non-Articulated) / 9m bus (Low entry) / 4-section tram like PESA Twist/Krakowiak
    },
} as const satisfies DatabaseSchema;

export const _stopSql = {
    id: 520,
    id_ul: 104,
    nazwa: 'KRYSZTAŁOWA 02',
    numer: 5562,
    slupek: null,
    odjazdy: 1,
    lon: 22.49792,
    lat: 51.2248,
    transport: 'A',
    linieA: '14,57,303,N2',
    linieT: '',
    linieR: '150,161',
    sort: 547,
    kierunek: 'OS.PORĘBA, FELIN  UNIWERSYTET',
    typ_tab: 0,
} satisfies Row<ValuesToKeys<typeof STOPS_TABLE.__columns__>>;

export type StopSql = typeof _stopSql;

export type Stop = {
    idSip: number;
    idZtm: number;
    streetId: Street['id'];
    streetName: Street['name'];
    order: number;
    description: string;
    groupName: string;
    groupNumber: string;
    position: Position;
    routes: {
        bus: string[];
        tram: string[];
        trolleybus: string[];
    };
    destinations: string[];
    transportMode: string;
    _post?: unknown;
    _tabType?: unknown;
};
