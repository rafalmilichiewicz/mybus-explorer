import { parseTimetableForStop } from '#src/lib/api/timetable/stop/index.ts';
import parseXml from '#src/lib/api/requests/parseXml.ts';
import { exampleEmpty, exampleEmptyParsed, exampleFull, exampleFullParsed, exampleOneEntry, exampleOneEntryParsed } from './examples.ts';
import { assertEquals } from '@std/assert/equals';

Deno.test('parseTimetableForStop should parse exampleFull', () => {
    const result = parseTimetableForStop(parseXml(exampleFull));
    assertEquals(result, exampleFullParsed);
});

Deno.test('parseTimetableForStop should parse exampleEmpty', () => {
    const result = parseTimetableForStop(parseXml(exampleEmpty));
    assertEquals(result, exampleEmptyParsed);
});

Deno.test('parseTimetableForStop should parse exampleOneEntry', () => {
    const result = parseTimetableForStop(parseXml(exampleOneEntry));
    assertEquals(result, exampleOneEntryParsed);
});
