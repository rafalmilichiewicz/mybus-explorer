import { TimetableStop } from '#src/lib/api/timetable/stop/type.ts';

export const exampleFull = `<?xml version="1.0" encoding="utf-8"?>
<Departures time="11:09" i="469">
	<N/>
	<D i="1071" di="428792" n="24036" t="40435" r="14" d="FELIN  UNIWERSYTET" dd="T" p="A" kn="    " vr="295" m="2" v="4 min" vn="BKN" iks="10087173"/>
	<D i="1920" di="428996" n="22469" t="40527" r="39" d="ZADĘBIE" dd="P" p="A" kn="    " vr="387" m="2" v="6 min" vn="NBK" iks="10088022"/>
	<D i="2850" di="428710" n="22380" t="40612" r="44" d="CHOINY" dd="P" p="A" kn="    " vr="472" m="2" 
v="7 min" vn="BKN" iks="10088952"/>
	<D i="1229" di="428753" n="5148" t="40669" r="40" d="CHODŹKI  SZPITAL" dd="T" p="A" kn="    " vr="529" m="2" v="8 min" vn="BKN" iks="10087331"/>
	<D i="2463" di="428656" n="22409" t="40956" r="32" d="DASZYŃSKIEGO" dd="T" p="A" kn="    " vr="816" m="2" v="13 min" vn="BKN" iks="10088565"/>
	<D i="2917" di="428958" n="24013" t="41190" r="45" d="MEŁGIEWSKA  WSEI" dd="P" p="A" kn="    " vr="1050" m="2" v="17 min" vn="BKN" iks="10089019"/>
	<D i="1268" di="428862" n="22478" t="41280" r="15" d="KONCERTOWA" dd="P" p="A" kn="    " vr="1140" m="2" v="19 min" vn="NBK" iks="10087370"/>
	<D i="524" di="428714" n="22297" t="41538" r="8" d="POLIGONOWA" dd="P" p="A" kn="    " vr="1398" m="3" v="11:32" vn="N" iks="10086626"/>
	<D i="2691" di="428998" n="0" t="41700" r="39" d="MEŁGIEWSKA  CHŁODNIA" dd="P" p="A" kn="    " vr="1560" m="3" v="11:35" vn="" iks="10088793"/>
	<D i="1097" di="428792" n="0" t="42240" r="14" d="FELIN  UNIWERSYTET" dd="T" p="A" kn="    " vr="2100" m="3" v="11:44" vn="" iks="10087199"/>
</Departures>`;

export const exampleFullParsed: TimetableStop = {
    'stopIdSip': 469,
    'currentTime': '11:09',
    'departures': [
        {
            'id': '1071',
            'estimatedDeparture': {
                'time': { 'seconds': 40435, 'hour': 11, 'minute': 13, 'label': '11:13' },
                'seconds': 295,
                'label': '4 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'FELIN  UNIWERSYTET',
            'route': {
                'direction': { 'id': 'T', 'type': 'outbound' },
                'number': '14',
                'id': '428792',
            },
            'vehicle': {
                'sideNumber': '24036',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                    { 'id': 'N', 'feature': 'accessibility' },
                ],
            },
        },
        {
            'id': '1920',
            'estimatedDeparture': {
                'time': { 'seconds': 40527, 'hour': 11, 'minute': 15, 'label': '11:15' },
                'seconds': 387,
                'label': '6 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'ZADĘBIE',
            'route': {
                'direction': { 'id': 'P', 'type': 'inbound' },
                'number': '39',
                'id': '428996',
            },
            'vehicle': {
                'sideNumber': '22469',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'N', 'feature': 'accessibility' },
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                ],
            },
        },
        {
            'id': '2850',
            'estimatedDeparture': {
                'time': { 'seconds': 40612, 'hour': 11, 'minute': 16, 'label': '11:16' },
                'seconds': 472,
                'label': '7 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'CHOINY',
            'route': {
                'direction': { 'id': 'P', 'type': 'inbound' },
                'number': '44',
                'id': '428710',
            },
            'vehicle': {
                'sideNumber': '22380',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                    { 'id': 'N', 'feature': 'accessibility' },
                ],
            },
        },
        {
            'id': '1229',
            'estimatedDeparture': {
                'time': { 'seconds': 40669, 'hour': 11, 'minute': 17, 'label': '11:17' },
                'seconds': 529,
                'label': '8 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'CHODŹKI  SZPITAL',
            'route': {
                'direction': { 'id': 'T', 'type': 'outbound' },
                'number': '40',
                'id': '428753',
            },
            'vehicle': {
                'sideNumber': '5148',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                    { 'id': 'N', 'feature': 'accessibility' },
                ],
            },
        },
        {
            'id': '2463',
            'estimatedDeparture': {
                'time': { 'seconds': 40956, 'hour': 11, 'minute': 22, 'label': '11:22' },
                'seconds': 816,
                'label': '13 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'DASZYŃSKIEGO',
            'route': {
                'direction': { 'id': 'T', 'type': 'outbound' },
                'number': '32',
                'id': '428656',
            },
            'vehicle': {
                'sideNumber': '22409',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                    { 'id': 'N', 'feature': 'accessibility' },
                ],
            },
        },
        {
            'id': '2917',
            'estimatedDeparture': {
                'time': { 'seconds': 41190, 'hour': 11, 'minute': 26, 'label': '11:26' },
                'seconds': 1050,
                'label': '17 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'MEŁGIEWSKA  WSEI',
            'route': {
                'direction': { 'id': 'P', 'type': 'inbound' },
                'number': '45',
                'id': '428958',
            },
            'vehicle': {
                'sideNumber': '24013',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                    { 'id': 'N', 'feature': 'accessibility' },
                ],
            },
        },
        {
            'id': '1268',
            'estimatedDeparture': {
                'time': { 'seconds': 41280, 'hour': 11, 'minute': 28, 'label': '11:28' },
                'seconds': 1140,
                'label': '19 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'KONCERTOWA',
            'route': {
                'direction': { 'id': 'P', 'type': 'inbound' },
                'number': '15',
                'id': '428862',
            },
            'vehicle': {
                'sideNumber': '22478',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'N', 'feature': 'accessibility' },
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                ],
            },
        },
        {
            'id': '524',
            'estimatedDeparture': {
                'time': { 'seconds': 41538, 'hour': 11, 'minute': 32, 'label': '11:32' },
                'seconds': 1398,
                'label': '11:32',
            },
            'trackingStatus': { 'id': 3, 'status': 'NO_TRACKING' },
            'destination': 'POLIGONOWA',
            'route': {
                'direction': { 'id': 'P', 'type': 'inbound' },
                'number': '8',
                'id': '428714',
            },
            'vehicle': {
                'sideNumber': '22297',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [{ 'id': 'N', 'feature': 'accessibility' }],
            },
        },
        {
            'id': '2691',
            'estimatedDeparture': {
                'time': { 'seconds': 41700, 'hour': 11, 'minute': 35, 'label': '11:35' },
                'seconds': 1560,
                'label': '11:35',
            },
            'trackingStatus': { 'id': 3, 'status': 'NO_TRACKING' },
            'destination': 'MEŁGIEWSKA  CHŁODNIA',
            'route': {
                'direction': { 'id': 'P', 'type': 'inbound' },
                'number': '39',
                'id': '428998',
            },
            'vehicle': { 'sideNumber': '0', 'type': { 'id': 'A', 'type': 'bus' }, 'flags': [] },
        },
        {
            'id': '1097',
            'estimatedDeparture': {
                'time': { 'seconds': 42240, 'hour': 11, 'minute': 44, 'label': '11:44' },
                'seconds': 2100,
                'label': '11:44',
            },
            'trackingStatus': { 'id': 3, 'status': 'NO_TRACKING' },
            'destination': 'FELIN  UNIWERSYTET',
            'route': {
                'direction': { 'id': 'T', 'type': 'outbound' },
                'number': '14',
                'id': '428792',
            },
            'vehicle': { 'sideNumber': '0', 'type': { 'id': 'A', 'type': 'bus' }, 'flags': [] },
        },
    ],
};

export const exampleEmpty = `<?xml version="1.0" encoding="utf-8"?><Departures time="11:14" i="569"><N/></Departures>`;
export const exampleEmptyParsed: TimetableStop = {
    'stopIdSip': 569,
    'currentTime': '11:14',
    'departures': [],
};

export const exampleOneEntry = `<?xml version="1.0" encoding="utf-8"?>
<Departures time="11:09" i="469">
	<N/>
	<D i="1071" di="428792" n="24036" t="40435" r="14" d="FELIN  UNIWERSYTET" dd="T" p="A" kn="    " vr="295" m="2" v="4 min" vn="BKN" iks="10087173"/>
</Departures>`;

export const exampleOneEntryParsed: TimetableStop = {
    'stopIdSip': 469,
    'currentTime': '11:09',
    'departures': [
        {
            'id': '1071',
            'estimatedDeparture': {
                'time': { 'seconds': 40435, 'hour': 11, 'minute': 13, 'label': '11:13' },
                'seconds': 295,
                'label': '4 min',
            },
            'trackingStatus': { 'id': 2, 'status': 'GPS_TRACKING' },
            'destination': 'FELIN  UNIWERSYTET',
            'route': {
                'direction': { 'id': 'T', 'type': 'outbound' },
                'number': '14',
                'id': '428792',
            },
            'vehicle': {
                'sideNumber': '24036',
                'type': { 'id': 'A', 'type': 'bus' },
                'flags': [
                    { 'id': 'B', 'feature': 'ticket_machine' },
                    { 'id': 'K', 'feature': 'air_conditioning' },
                    { 'id': 'N', 'feature': 'accessibility' },
                ],
            },
        },
    ],
};
