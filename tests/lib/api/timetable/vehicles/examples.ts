import { TimetableVehicle } from '#src/lib/api/timetable/vehicle/type.ts';

export const exampleFull = `<?xml version="1.0" encoding="utf-8"?>
<Schedules id="2648" nr="38" type="C" o="WĘGLIN">
	<Stop lp="23" id="514" name="JUTRZENKI 02" th="" tm="&lt;1min" s="27" m="1"/>
	<Stop lp="24" id="512" name="DZIEWANNY 02" th="" tm="2 min" s="147" m="2"/>
	<Stop lp="25" id="506" name="IRYDIONA 01" th="" tm="4 min" s="267" m="2"/>
	<Stop lp="26" id="543" name="POCZEKAJKA 01" th="" tm="6 min" s="387" m="2"/>
	<Stop lp="27" id="546" name="SZPITAL WOJEWÓDZKI 01" th="" tm="7 min" 
s="447" m="2"/>
	<Stop lp="28" id="548" name="ZWYCIĘSKA 01" th="" tm="9 min" s="567" m="2"/>
	<Stop lp="29" id="550" name="RZEMIEŚLNICZA 01" th="" tm="11 min" s="687" m="2"/>
	<Stop lp="30" id="553" name="WĘGLIN 01" th="" tm="12 min" s="747" m="2"/>
	<Stop lp="31" id="1003" name="WĘGLIN 03" th="" tm="13 min" s="807" m="2"/>
</Schedules>`;

export const exampleFullParsed: TimetableVehicle = {
    'id': 2648,
    'route': { 'number': '38', 'variant': 'C', 'destination': 'WĘGLIN' },
    'stops': [
        {
            'stop': { 'numberEnRoute': 23, 'idSip': 514, 'name': 'JUTRZENKI 02' },
            'time': { 'label': '<1min', 'seconds': 27 },
            'status': { 'id': 1, 'status': 'WITHIN_STOP_AREA' },
        },
        {
            'stop': { 'numberEnRoute': 24, 'idSip': 512, 'name': 'DZIEWANNY 02' },
            'time': { 'label': '2 min', 'seconds': 147 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 25, 'idSip': 506, 'name': 'IRYDIONA 01' },
            'time': { 'label': '4 min', 'seconds': 267 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 26, 'idSip': 543, 'name': 'POCZEKAJKA 01' },
            'time': { 'label': '6 min', 'seconds': 387 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 27, 'idSip': 546, 'name': 'SZPITAL WOJEWÓDZKI 01' },
            'time': { 'label': '7 min', 'seconds': 447 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 28, 'idSip': 548, 'name': 'ZWYCIĘSKA 01' },
            'time': { 'label': '9 min', 'seconds': 567 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 29, 'idSip': 550, 'name': 'RZEMIEŚLNICZA 01' },
            'time': { 'label': '11 min', 'seconds': 687 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 30, 'idSip': 553, 'name': 'WĘGLIN 01' },
            'time': { 'label': '12 min', 'seconds': 747 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
        {
            'stop': { 'numberEnRoute': 31, 'idSip': 1003, 'name': 'WĘGLIN 03' },
            'time': { 'label': '13 min', 'seconds': 807 },
            'status': { 'id': 2, 'status': 'GPS_TRACKING' },
        },
    ],
};

export const exampleEmpty = `<?xml version="1.0" encoding="utf-8"?><Schedules/>`;
export const exampleEmptyParsed: TimetableVehicle = {
    id: 0,
    route: { number: '', variant: '', destination: '' },
    stops: [],
};

export const exampleOneRemaining = `<?xml version="1.0" encoding="utf-8"?>
<Schedules id="2648" nr="38" type="C" o="WĘGLIN">
	<Stop lp="31" id="1003" name="WĘGLIN 03" th="" tm="&lt;1min" s="27" m="1"/>
</Schedules>`;

export const exampleOneRemainingParsed: TimetableVehicle = {
    'id': 2648,
    'route': { 'number': '38', 'variant': 'C', 'destination': 'WĘGLIN' },
    'stops': [
        {
            'stop': { 'numberEnRoute': 31, 'idSip': 1003, 'name': 'WĘGLIN 03' },
            'time': { 'label': '<1min', 'seconds': 27 },
            'status': { 'id': 1, 'status': 'WITHIN_STOP_AREA' },
        },
    ],
};
