import parseXml from '#src/lib/api/requests/parseXml.ts';
import { parseVehiclesEnRoute } from '#src/lib/api/vehicles/vehicles.ts';
import { assertEquals } from '@std/assert/equals';
import {
    exampleEmpty,
    exampleEmptyParsed,
    exampleFull,
    exampleFullParsed,
    exampleOneVehicle,
    exampleOneVehicleParsed,
} from './examples.ts';

Deno.test('parseVehiclesEnRoute should parse exampleFull', () => {
    const result = parseVehiclesEnRoute(parseXml(exampleFull));
    assertEquals(result, exampleFullParsed);
});

Deno.test('parseVehiclesEnRoute should parse exampleEmpty', () => {
    const result = parseVehiclesEnRoute(parseXml(exampleEmpty));
    assertEquals(result, exampleEmptyParsed);
});

Deno.test('parseVehiclesEnRoute should parse exampleOneVehicle', () => {
    const result = parseVehiclesEnRoute(parseXml(exampleOneVehicle));
    assertEquals(result, exampleOneVehicleParsed);
});
