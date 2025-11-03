import parseXml from '#src/lib/api/requests/parseXml.ts';
import { parseTimetableForVehicle } from '#src/lib/api/timetable/vehicle/index.ts';
import { assertEquals } from '@std/assert';
import { exampleEmpty, exampleEmptyParsed, exampleOneRemaining, exampleOneRemainingParsed } from './examples.ts';

Deno.test('parseTimetableForVehicle should parse exampleEmpty', () => {
    const result = parseTimetableForVehicle(parseXml(exampleEmpty));
    console.log(result);
    assertEquals(result, exampleEmptyParsed);
});


Deno.test('parseTimetableForVehicle should parse exampleEmpty', () => {
    const result = parseTimetableForVehicle(parseXml(exampleEmpty));
    console.log(result);
    assertEquals(result, exampleEmptyParsed);
});

Deno.test('parseTimetableForVehicle should parse exampleOneRemaining', () => {
    const result = parseTimetableForVehicle(parseXml(exampleOneRemaining));
    console.log(result);
    assertEquals(result, exampleOneRemainingParsed);
});
