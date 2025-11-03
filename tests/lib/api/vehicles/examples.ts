import { VehicleEnRoute } from '#src/lib/api/vehicles/vehicle.ts';

export const exampleFull = `<?xml version="1.0" encoding="utf-8"?>
<VL>
	<V id="890765659" nb="22417" nr="4    " wt="B" kr="T" ik="571" lp="12" dp="405" dw="0" x="22.53725" y="51.24958" px="22.53628" py="51.24975" o="17" s="2" p="10:25" op="ŻEGLARSKA" c="BKN" 
nk="43648" nnr="" nwt="" nkr="" nop="" is="0" vt="A" kwi="044/06"/>
	<V id="890765705" nb="22386" nr="" wt="" kr="" ik="0" lp="0" dp="0" dw="0" x="22.53075" y="51.19463" px="22.53075" py="51.19463" o="183" s="6" p="" op="" c="BKN" 
nk="504" nnr="4    " nwt="C" nkr="P" nop="POLIGONOWA" is="183" vt="A" kwi="008/03"/>
</VL>`;

export const exampleFullParsed: VehicleEnRoute[] = [
    {
        'id': '890765659',
        'sideNumer': '22417',
        'position': { 'longitude': 22.53725, 'latitude': 51.24958 },
        '_positionP': { 'longitude': 22.53628, 'latitude': 51.24975 },
        'status': { 'id': 2, 'flags': { 'moving': true, 'enRoute': false } },
        'currentRoute': {
            'number': '4',
            'destination': 'ŻEGLARSKA',
            'variant': 'B',
            'direction': { 'id': 'T', 'type': 'outbound' },
            'id': '571',
        },
        'nextRoute': {
            'number': '',
            'destination': '',
            'variant': '',
            'direction': { 'id': '', 'type': '_unknown' },
            'id': '43648',
        },
        'delay': 17,
        'flags': [
            { 'id': 'B', 'feature': 'ticket_machine' },
            { 'id': 'K', 'feature': 'air_conditioning' },
            { 'id': 'N', 'feature': 'accessibility' },
        ],
        'type': { 'id': 'A', 'type': 'bus' },
        'nextStopOnRouteIndex': 12,
        'brigade': '044/06',
        'plannedDepartureTime': '10:25',
    },
    {
        'id': '890765705',
        'sideNumer': '22386',
        'position': { 'longitude': 22.53075, 'latitude': 51.19463 },
        '_positionP': { 'longitude': 22.53075, 'latitude': 51.19463 },
        'status': { 'id': 6, 'flags': { 'moving': false, 'enRoute': true } },
        'currentRoute': {
            'number': '',
            'destination': '',
            'variant': '',
            'direction': { 'id': '', 'type': '_unknown' },
            'id': '0',
        },
        'nextRoute': {
            'number': '4',
            'destination': 'POLIGONOWA',
            'variant': 'C',
            'direction': { 'id': 'P', 'type': 'inbound' },
            'id': '504',
        },
        'delay': 183,
        'flags': [
            { 'id': 'B', 'feature': 'ticket_machine' },
            { 'id': 'K', 'feature': 'air_conditioning' },
            { 'id': 'N', 'feature': 'accessibility' },
        ],
        'type': { 'id': 'A', 'type': 'bus' },
        'nextStopOnRouteIndex': 0,
        'brigade': '008/03',
        'plannedDepartureTime': '',
    },
];

export const exampleEmpty = `<?xml version="1.0" encoding="utf-8"?><VL/>`;
export const exampleEmptyParsed: VehicleEnRoute[] = [];

export const exampleOneVehicle = `<?xml version="1.0" encoding="utf-8"?>
<VL>
	<V id="890765659" nb="22417" nr="4    " wt="B" kr="T" ik="571" lp="12" dp="405" dw="0" x="22.53725" y="51.24958" px="22.53628" py="51.24975" o="17" s="2" p="10:25" op="ŻEGLARSKA" c="BKN" 
nk="43648" nnr="" nwt="" nkr="" nop="" is="0" vt="A" kwi="044/06"/>
</VL>`;
export const exampleOneVehicleParsed: VehicleEnRoute[] = [
    {
        'id': '890765659',
        'sideNumer': '22417',
        'position': { 'longitude': 22.53725, 'latitude': 51.24958 },
        '_positionP': { 'longitude': 22.53628, 'latitude': 51.24975 },
        'status': { 'id': 2, 'flags': { 'moving': true, 'enRoute': false } },
        'currentRoute': {
            'number': '4',
            'destination': 'ŻEGLARSKA',
            'variant': 'B',
            'direction': { 'id': 'T', 'type': 'outbound' },
            'id': '571',
        },
        'nextRoute': {
            'number': '',
            'destination': '',
            'variant': '',
            'direction': { 'id': '', 'type': '_unknown' },
            'id': '43648',
        },
        'delay': 17,
        'flags': [
            { 'id': 'B', 'feature': 'ticket_machine' },
            { 'id': 'K', 'feature': 'air_conditioning' },
            { 'id': 'N', 'feature': 'accessibility' },
        ],
        'type': { 'id': 'A', 'type': 'bus' },
        'nextStopOnRouteIndex': 12,
        'brigade': '044/06',
        'plannedDepartureTime': '10:25',
    },
];
