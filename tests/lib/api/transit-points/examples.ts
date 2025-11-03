import { RouteTransitPoints } from '#src/lib/api/route-points/point.ts';

export const fullExample = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152">
		<Pkt l="1" x="22.57547" y="51.23694"/>
		<Pkt l="2" x="22.57523" y="51.23703"/>
		<Pkt l="3" x="22.57513" y="51.23711"/>
		<Pkt l="4" x="22.5742" y="51.23741"/>
		<Pkt l="5" x="22.57338" y="51.23773"/>
		<Pkt l="6" x="22.57288" y="51.23795"/>
		<Pkt l="7" x="22.57247" y="51.2382"/>
		<Pkt l="8" x="22.5722" y="51.2384"/>
		<Pkt l="9" x="22.57223" y="51.23855"/>
		<Pkt l="10" x="22.5725" y="51.23966"/>
		<Pkt l="11" x="22.57257" y="51.23993"/>
		<Pkt l="12" x="22.57261" y="51.24007"/>
		<Pkt l="13" x="22.57244" y="51.24025"/>
		<Pkt l="14" x="22.57238" y="51.24029"/>
		<Pkt l="15" x="22.57226" y="51.24032"/>
		<Pkt l="16" x="22.57216" y="51.24034"/>
		<Pkt l="17" x="22.57193" y="51.24033"/>
		<Pkt l="18" x="22.57154" y="51.24023"/>
		<Pkt l="19" x="22.57113" y="51.24009"/>
		<Pkt l="20" x="22.57101" y="51.24007"/>
		<Pkt l="21" x="22.5709" y="51.24005"/>
		<Pkt l="22" x="22.5708" y="51.24005"/>
		<Pkt l="23" x="22.57066" y="51.24006"/>
		<Pkt l="24" x="22.57057" y="51.24008"/>
		<Pkt l="25" x="22.57049" y="51.24011"/>
		<Pkt l="26" x="22.57042" y="51.24015"/>
		<Pkt l="27" x="22.57031" y="51.24027"/>
		<Pkt l="28" x="22.57014" y="51.24047"/>
		<Pkt l="29" x="22.56968" y="51.24108"/>
		<Pkt l="30" x="22.56954" y="51.24126"/>
		<Pkt l="31" x="22.5694" y="51.24145"/>
	</T>
	<T i1="152" i2="9">
		<Pkt l="1" x="22.56897" y="51.24214"/>
		<Pkt l="2" x="22.56888" y="51.24238"/>
		<Pkt l="3" x="22.56877" y="51.24297"/>
		<Pkt l="4" x="22.56873" y="51.24342"/>
		<Pkt l="5" x="22.56856" y="51.24508"/>
		<Pkt l="6" x="22.56847" y="51.24626"/>
		<Pkt l="7" x="22.56845" y="51.24633"/>
		<Pkt l="8" x="22.56842" y="51.24638"/>
		<Pkt l="9" x="22.56832" y="51.24645"/>
		<Pkt l="10" x="22.56818" y="51.24646"/>
		<Pkt l="11" x="22.56777" y="51.24646"/>
		<Pkt l="12" x="22.56758" y="51.2465"/>
		<Pkt l="13" x="22.56729" y="51.2465"/>
		<Pkt l="14" x="22.56702" y="51.24655"/>
		<Pkt l="15" x="22.56678" y="51.24664"/>
		<Pkt l="16" x="22.56657" y="51.24673"/>
		<Pkt l="17" x="22.56638" y="51.24687"/>
		<Pkt l="18" x="22.56622" y="51.24698"/>
		<Pkt l="19" x="22.56609" y="51.24714"/>
		<Pkt l="20" x="22.566" y="51.24726"/>
		<Pkt l="21" x="22.56598" y="51.24745"/>
		<Pkt l="22" x="22.56597" y="51.24775"/>
		<Pkt l="23" x="22.56597" y="51.24796"/>
		<Pkt l="24" x="22.56597" y="51.24823"/>
	</T>
	<T i1="9" i2="96">
		<Pkt l="1" x="22.56597" y="51.24822"/>
		<Pkt l="2" x="22.56603" y="51.24844"/>
		<Pkt l="3" x="22.56609" y="51.2486"/>
		<Pkt l="4" x="22.56617" y="51.24876"/>
		<Pkt l="5" x="22.56637" y="51.24907"/>
		<Pkt l="6" x="22.56642" y="51.24916"/>
		<Pkt l="7" x="22.56696" y="51.25002"/>
		<Pkt l="8" x="22.56708" y="51.25022"/>
		<Pkt l="9" x="22.56753" y="51.25091"/>
		<Pkt l="10" x="22.568" y="51.25166"/>
		<Pkt l="11" x="22.5681" y="51.25181"/>
		<Pkt l="12" x="22.56832" y="51.25218"/>
	</T>
	<T i1="96" i2="98">
		<Pkt l="1" x="22.56838" y="51.25226"/>
		<Pkt l="2" x="22.56854" y="51.2525"/>
		<Pkt l="3" x="22.56856" y="51.25254"/>
		<Pkt l="4" x="22.56896" y="51.25316"/>
		<Pkt l="5" x="22.56918" y="51.25353"/>
		<Pkt l="6" x="22.56955" y="51.25412"/>
		<Pkt l="7" x="22.5701" y="51.25502"/>
		<Pkt l="8" x="22.5703" y="51.25533"/>
	</T>
	<T i1="98" i2="102">
		<Pkt l="1" x="22.5703" y="51.25533"/>
		<Pkt l="2" x="22.57039" y="51.25547"/>
		<Pkt l="3" x="22.57071" y="51.25599"/>
		<Pkt l="4" x="22.57196" y="51.25809"/>
		<Pkt l="5" x="22.57222" y="51.25853"/>
		<Pkt l="6" x="22.57223" y="51.25862"/>
		<Pkt l="7" x="22.57222" y="51.25877"/>
		<Pkt l="8" x="22.57204" y="51.25878"/>
		<Pkt l="9" x="22.57187" y="51.25879"/>
		<Pkt l="10" x="22.57169" y="51.2588"/>
		<Pkt l="11" x="22.57159" y="51.2588"/>
	</T>
	<T i1="102" i2="90">
		<Pkt l="1" x="22.5708" y="51.25882"/>
		<Pkt l="2" x="22.57061" y="51.25882"/>
		<Pkt l="3" x="22.57047" y="51.25882"/>
		<Pkt l="4" x="22.56902" y="51.25887"/>
		<Pkt l="5" x="22.56871" y="51.25887"/>
		<Pkt l="6" x="22.56848" y="51.25887"/>
		<Pkt l="7" x="22.56829" y="51.25891"/>
		<Pkt l="8" x="22.56819" y="51.25896"/>
		<Pkt l="9" x="22.56796" y="51.25906"/>
		<Pkt l="10" x="22.56778" y="51.25916"/>
	</T>
	<T i1="90" i2="92">
		<Pkt l="1" x="22.56691" y="51.25963"/>
		<Pkt l="2" x="22.56628" y="51.25999"/>
		<Pkt l="3" x="22.56517" y="51.26065"/>
		<Pkt l="4" x="22.56501" y="51.26071"/>
	</T>
	<T i1="92" i2="67">
		<Pkt l="1" x="22.56457" y="51.26114"/>
		<Pkt l="2" x="22.56423" y="51.26155"/>
		<Pkt l="3" x="22.56409" y="51.26168"/>
		<Pkt l="4" x="22.56395" y="51.26183"/>
		<Pkt l="5" x="22.56373" y="51.26208"/>
		<Pkt l="6" x="22.56355" y="51.26228"/>
		<Pkt l="7" x="22.56333" y="51.26255"/>
		<Pkt l="8" x="22.56328" y="51.26258"/>
		<Pkt l="9" x="22.56313" y="51.26285"/>
		<Pkt l="10" x="22.56286" y="51.26335"/>
		<Pkt l="11" x="22.56279" y="51.26346"/>
		<Pkt l="12" x="22.56209" y="51.26344"/>
		<Pkt l="13" x="22.56124" y="51.2634"/>
		<Pkt l="14" x="22.56036" 
y="51.26343"/>
	</T>
	<T i1="67" i2="70">
		<Pkt l="1" x="22.56036" y="51.26343"/>
		<Pkt l="2" x="22.55936" y="51.26345"/>
		<Pkt l="3" x="22.55909" y="51.26348"/>
		<Pkt l="4" x="22.55895" y="51.26352"/>
		<Pkt l="5" x="22.55888" y="51.26353"/>
		<Pkt l="6" x="22.55882" y="51.26355"/>
		<Pkt l="7" x="22.55868" y="51.2636"/>
		<Pkt l="8" x="22.55863" y="51.26367"/>
		<Pkt l="9" x="22.55843" y="51.26441"/>
		<Pkt l="10" x="22.55837" y="51.26508"/>
		<Pkt l="11" x="22.55834" y="51.26598"/>
	</T>
	<T i1="70" i2="77">
		<Pkt l="1" x="22.55834" y="51.26598"/>
		<Pkt l="2" x="22.55834" y="51.266"/>
		<Pkt l="3" x="22.55836" y="51.26746"/>
		<Pkt l="4" x="22.5586" y="51.26911"/>
		<Pkt l="5" x="22.55859" y="51.26955"/>
		<Pkt l="6" x="22.55857" y="51.26969"/>
		<Pkt l="7" x="22.55852" y="51.26983"/>
		<Pkt l="8" x="22.55847" y="51.27001"/>
	</T>
	<T i1="77" i2="72">
		<Pkt l="1" x="22.55847" y="51.27001"/>
		<Pkt l="2" x="22.55837" y="51.27035"/>
		<Pkt l="3" x="22.55826" y="51.27064"/>
		<Pkt l="4" x="22.55812" y="51.27097"/>
		<Pkt l="5" x="22.55806" y="51.27109"/>
		<Pkt l="6" x="22.55791" y="51.27134"/>
		<Pkt l="7" x="22.55751" y="51.27196"/>
		<Pkt l="8" x="22.55737" y="51.27222"/>
		<Pkt l="9" x="22.55717" y="51.27253"/>
		<Pkt l="10" x="22.55652" y="51.2735"/>
	</T>
	<T i1="72" i2="917">
		<Pkt l="1" x="22.55466" y="51.27652"/>
	</T>
	<T i1="917" i2="898">
		<Pkt l="1" x="22.5536" y="51.27865"/>
		<Pkt l="2" x="22.55339" y="51.27913"/>
		<Pkt l="3" x="22.55338" y="51.27929"/>
		<Pkt l="4" x="22.55337" y="51.27948"/>
		<Pkt l="5" x="22.55345" y="51.27952"/>
		<Pkt l="6" x="22.55348" y="51.27958"/>
		<Pkt l="7" x="22.55342" y="51.27973"/>
		<Pkt l="8" x="22.55333" y="51.27991"/>
		<Pkt l="9" x="22.55333" y="51.28002"/>
		<Pkt l="10" x="22.55334" y="51.28017"/>
		<Pkt l="11" x="22.55333" y="51.28023"/>
		<Pkt l="12" x="22.55326" y="51.2803"/>
		<Pkt l="13" x="22.55315" y="51.28036"/>
		<Pkt l="14" x="22.55308" y="51.28048"/>
	</T>
	<T i1="898" i2="918">
		<Pkt l="1" x="22.55285" y="51.28101"/>
	</T>
	<T i1="918" i2="918"/>
</R>`;
export const fullParsed: RouteTransitPoints = {
    'route': {
        'number': '160',
        'variant': 'B',
    },
    'points': [
        {
            'type': 'stop',
            'id': 251,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57547,
                'latitude': 51.23694,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57523,
                'latitude': 51.23703,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57513,
                'latitude': 51.23711,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5742,
                'latitude': 51.23741,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57338,
                'latitude': 51.23773,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57288,
                'latitude': 51.23795,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57247,
                'latitude': 51.2382,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5722,
                'latitude': 51.2384,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57223,
                'latitude': 51.23855,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5725,
                'latitude': 51.23966,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57257,
                'latitude': 51.23993,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57261,
                'latitude': 51.24007,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57244,
                'latitude': 51.24025,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57238,
                'latitude': 51.24029,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57226,
                'latitude': 51.24032,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57216,
                'latitude': 51.24034,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57193,
                'latitude': 51.24033,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57154,
                'latitude': 51.24023,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57113,
                'latitude': 51.24009,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57101,
                'latitude': 51.24007,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5709,
                'latitude': 51.24005,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5708,
                'latitude': 51.24005,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57066,
                'latitude': 51.24006,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57057,
                'latitude': 51.24008,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57049,
                'latitude': 51.24011,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57042,
                'latitude': 51.24015,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57031,
                'latitude': 51.24027,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57014,
                'latitude': 51.24047,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56968,
                'latitude': 51.24108,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56954,
                'latitude': 51.24126,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5694,
                'latitude': 51.24145,
            },
        },
        {
            'type': 'stop',
            'id': 152,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56897,
                'latitude': 51.24214,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56888,
                'latitude': 51.24238,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56877,
                'latitude': 51.24297,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56873,
                'latitude': 51.24342,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56856,
                'latitude': 51.24508,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56847,
                'latitude': 51.24626,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56845,
                'latitude': 51.24633,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56842,
                'latitude': 51.24638,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56832,
                'latitude': 51.24645,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56818,
                'latitude': 51.24646,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56777,
                'latitude': 51.24646,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56758,
                'latitude': 51.2465,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56729,
                'latitude': 51.2465,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56702,
                'latitude': 51.24655,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56678,
                'latitude': 51.24664,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56657,
                'latitude': 51.24673,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56638,
                'latitude': 51.24687,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56622,
                'latitude': 51.24698,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56609,
                'latitude': 51.24714,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.566,
                'latitude': 51.24726,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56598,
                'latitude': 51.24745,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56597,
                'latitude': 51.24775,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56597,
                'latitude': 51.24796,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56597,
                'latitude': 51.24823,
            },
        },
        {
            'type': 'stop',
            'id': 9,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56597,
                'latitude': 51.24822,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56603,
                'latitude': 51.24844,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56609,
                'latitude': 51.2486,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56617,
                'latitude': 51.24876,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56637,
                'latitude': 51.24907,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56642,
                'latitude': 51.24916,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56696,
                'latitude': 51.25002,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56708,
                'latitude': 51.25022,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56753,
                'latitude': 51.25091,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.568,
                'latitude': 51.25166,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5681,
                'latitude': 51.25181,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56832,
                'latitude': 51.25218,
            },
        },
        {
            'type': 'stop',
            'id': 96,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56838,
                'latitude': 51.25226,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56854,
                'latitude': 51.2525,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56856,
                'latitude': 51.25254,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56896,
                'latitude': 51.25316,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56918,
                'latitude': 51.25353,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56955,
                'latitude': 51.25412,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5701,
                'latitude': 51.25502,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5703,
                'latitude': 51.25533,
            },
        },
        {
            'type': 'stop',
            'id': 98,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5703,
                'latitude': 51.25533,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57039,
                'latitude': 51.25547,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57071,
                'latitude': 51.25599,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57196,
                'latitude': 51.25809,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57222,
                'latitude': 51.25853,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57223,
                'latitude': 51.25862,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57222,
                'latitude': 51.25877,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57204,
                'latitude': 51.25878,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57187,
                'latitude': 51.25879,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57169,
                'latitude': 51.2588,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57159,
                'latitude': 51.2588,
            },
        },
        {
            'type': 'stop',
            'id': 102,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5708,
                'latitude': 51.25882,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57061,
                'latitude': 51.25882,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.57047,
                'latitude': 51.25882,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56902,
                'latitude': 51.25887,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56871,
                'latitude': 51.25887,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56848,
                'latitude': 51.25887,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56829,
                'latitude': 51.25891,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56819,
                'latitude': 51.25896,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56796,
                'latitude': 51.25906,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56778,
                'latitude': 51.25916,
            },
        },
        {
            'type': 'stop',
            'id': 90,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56691,
                'latitude': 51.25963,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56628,
                'latitude': 51.25999,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56517,
                'latitude': 51.26065,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56501,
                'latitude': 51.26071,
            },
        },
        {
            'type': 'stop',
            'id': 92,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56457,
                'latitude': 51.26114,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56423,
                'latitude': 51.26155,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56409,
                'latitude': 51.26168,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56395,
                'latitude': 51.26183,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56373,
                'latitude': 51.26208,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56355,
                'latitude': 51.26228,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56333,
                'latitude': 51.26255,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56328,
                'latitude': 51.26258,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56313,
                'latitude': 51.26285,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56286,
                'latitude': 51.26335,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56279,
                'latitude': 51.26346,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56209,
                'latitude': 51.26344,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56124,
                'latitude': 51.2634,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56036,
                'latitude': 51.26343,
            },
        },
        {
            'type': 'stop',
            'id': 67,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.56036,
                'latitude': 51.26343,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55936,
                'latitude': 51.26345,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55909,
                'latitude': 51.26348,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55895,
                'latitude': 51.26352,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55888,
                'latitude': 51.26353,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55882,
                'latitude': 51.26355,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55868,
                'latitude': 51.2636,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55863,
                'latitude': 51.26367,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55843,
                'latitude': 51.26441,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55837,
                'latitude': 51.26508,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55834,
                'latitude': 51.26598,
            },
        },
        {
            'type': 'stop',
            'id': 70,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55834,
                'latitude': 51.26598,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55834,
                'latitude': 51.266,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55836,
                'latitude': 51.26746,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5586,
                'latitude': 51.26911,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55859,
                'latitude': 51.26955,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55857,
                'latitude': 51.26969,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55852,
                'latitude': 51.26983,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55847,
                'latitude': 51.27001,
            },
        },
        {
            'type': 'stop',
            'id': 77,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55847,
                'latitude': 51.27001,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55837,
                'latitude': 51.27035,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55826,
                'latitude': 51.27064,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55812,
                'latitude': 51.27097,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55806,
                'latitude': 51.27109,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55791,
                'latitude': 51.27134,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55751,
                'latitude': 51.27196,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55737,
                'latitude': 51.27222,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55717,
                'latitude': 51.27253,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55652,
                'latitude': 51.2735,
            },
        },
        {
            'type': 'stop',
            'id': 72,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55466,
                'latitude': 51.27652,
            },
        },
        {
            'type': 'stop',
            'id': 917,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.5536,
                'latitude': 51.27865,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55339,
                'latitude': 51.27913,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55338,
                'latitude': 51.27929,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55337,
                'latitude': 51.27948,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55345,
                'latitude': 51.27952,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55348,
                'latitude': 51.27958,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55342,
                'latitude': 51.27973,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55333,
                'latitude': 51.27991,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55333,
                'latitude': 51.28002,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55334,
                'latitude': 51.28017,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55333,
                'latitude': 51.28023,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55326,
                'latitude': 51.2803,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55315,
                'latitude': 51.28036,
            },
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55308,
                'latitude': 51.28048,
            },
        },
        {
            'type': 'stop',
            'id': 898,
        },
        {
            'type': 'point',
            'position': {
                'longitude': 22.55285,
                'latitude': 51.28101,
            },
        },
        {
            'type': 'stop',
            'id': 918,
        },
    ],
};

export const exampleInvalidSequence = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152">
		<Pkt l="1" x="22.57547" y="51.23694"/>
		<Pkt l="4" x="22.57523" y="51.23703"/>
		<Pkt l="3" x="22.57513" y="51.23711"/>
	</T>
	<T i1="152" i2="152"/>
</R>`;

export const exampleInvalidLength = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152">
		<Pkt l="1" x="22.57547" y="51.23694"/>
		<Pkt l="2" x="22.57523" y="51.23703"/>
		<Pkt l="4" x="22.57513" y="51.23711"/>
	</T>
	<T i1="152" i2="152"/>
</R>`;

export const exampleZeroLength = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152">
		<Pkt l="0" x="22.57547" y="51.23694"/>
		<Pkt l="1" x="22.57523" y="51.23703"/>
		<Pkt l="2" x="22.57513" y="51.23711"/>
	</T>
	<T i1="152" i2="152"/>
</R>`;

export const exampleZeroLengthParsed: RouteTransitPoints = {
    route: { number: '160', variant: 'B' },
    points: [
        { type: 'stop', id: 251 },
        {
            type: 'point',
            position: { longitude: 22.57547, latitude: 51.23694 },
        },
        {
            type: 'point',
            position: { longitude: 22.57523, latitude: 51.23703 },
        },
        {
            type: 'point',
            position: { longitude: 22.57513, latitude: 51.23711 },
        },
        { type: 'stop', id: 152 },
    ],
};

export const exampleOneLength = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152">
		<Pkt l="1" x="22.57547" y="51.23694"/>
		<Pkt l="2" x="22.57523" y="51.23703"/>
		<Pkt l="3" x="22.57513" y="51.23711"/>
	</T>
	<T i1="152" i2="152"/>
</R>`;

export const exampleOneLengthParsed: RouteTransitPoints = {
    route: {
        number: '160',
        variant: 'B',
    },
    points: [
        { type: 'stop', id: 251 },
        {
            type: 'point',
            position: { longitude: 22.57547, latitude: 51.23694 },
        },
        {
            type: 'point',
            position: { longitude: 22.57523, latitude: 51.23703 },
        },
        {
            type: 'point',
            position: { longitude: 22.57513, latitude: 51.23711 },
        },
        { type: 'stop', id: 152 },
    ],
};

export const exampleStopsOnly = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152"/>
	<T i1="152" i2="154"/>
	<T i1="154" i2="156"/>
	<T i1="156" i2="157"/>
	<T i1="157" i2="158"/>
	<T i1="158" i2="158"/>
</R>`;

export const exampleStopsOnlyParsed: RouteTransitPoints = {
    route: { number: '160', variant: 'B' },
    points: [
        { type: 'stop', id: 251 },
        { type: 'stop', id: 152 },
        { type: 'stop', id: 154 },
        { type: 'stop', id: 156 },
        { type: 'stop', id: 157 },
        { type: 'stop', id: 158 },
    ],
};

export const exampleOnePoint = `
<?xml version="1.0" encoding="utf-8"?>
<R r="160" t="B">
	<T i1="251" i2="152">
		<Pkt l="0" x="22.57547" y="51.23694"/>
	</T>
	<T i1="152" i2="152"/>
</R>`;

export const exampleOnePointParsed: RouteTransitPoints = {
    route: { number: '160', variant: 'B' },
    points: [
        { type: 'stop', id: 251 },
        {
            type: 'point',
            position: { longitude: 22.57547, latitude: 51.23694 },
        },
        { type: 'stop', id: 152 },
    ],
};
