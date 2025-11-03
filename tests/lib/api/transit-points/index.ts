import { assertEquals, assertThrows } from '@std/assert';
import { parseRouteTransitPointsData } from '#src/lib/api/route-points/route-points.ts';
import parseXml from '#src/lib/api/requests/parseXml.ts';
import {
    exampleInvalidLength,
    exampleInvalidSequence,
    exampleOneLength,
    exampleOneLengthParsed,
    exampleOnePoint,
    exampleOnePointParsed,
    exampleStopsOnly,
    exampleStopsOnlyParsed,
    exampleZeroLength,
    exampleZeroLengthParsed,
    exampleFull,
    exampleFullParsed,
} from './examples.ts';

const ROUTE_NUMBER = '160';
const ROUTE_VARIANT = 'B';

Deno.test('getRouteTransitPoints should parse fullExample response', () => {
    const parsed = parseRouteTransitPointsData(parseXml(exampleFull), ROUTE_NUMBER, ROUTE_VARIANT);
    assertEquals(parsed, exampleFullParsed);
});

Deno.test('getRouteTransitPoints should throw when parsing exampleInvalidSequence', () => {
    assertThrows(() => {
        parseRouteTransitPointsData(parseXml(exampleInvalidSequence), ROUTE_NUMBER, ROUTE_VARIANT);
    });
});

Deno.test('getRouteTransitPoints should throw when parsing exampleInvalidLength', () => {
    assertThrows(() => {
        parseRouteTransitPointsData(parseXml(exampleInvalidLength), ROUTE_NUMBER, ROUTE_VARIANT);
    });
});

Deno.test('getRouteTransitPoints should parse exampleZeroLength', () => {
    const parsed = parseRouteTransitPointsData(
        parseXml(exampleZeroLength),
        ROUTE_NUMBER,
        ROUTE_VARIANT
    );
    assertEquals(parsed, exampleZeroLengthParsed);
});

Deno.test('getRouteTransitPoints should parse exampleOneLength', () => {
    const parsed = parseRouteTransitPointsData(
        parseXml(exampleOneLength),
        ROUTE_NUMBER,
        ROUTE_VARIANT
    );
    assertEquals(parsed, exampleOneLengthParsed);
});

Deno.test('getRouteTransitPoints should parse exampleStopsOnly', () => {
    const parsed = parseRouteTransitPointsData(
        parseXml(exampleStopsOnly),
        ROUTE_NUMBER,
        ROUTE_VARIANT
    );

    assertEquals(parsed, exampleStopsOnlyParsed);
});

Deno.test('getRouteTransitPoints should parse exampleOnePoint', () => {
    const parsed = parseRouteTransitPointsData(
        parseXml(exampleOnePoint),
        ROUTE_NUMBER,
        ROUTE_VARIANT
    );
    assertEquals(parsed, exampleOnePointParsed);
});
