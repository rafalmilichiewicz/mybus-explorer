import { getSimpleDate, stringRepresentationOfMetadata } from '#src/lib/utils/dates.ts';
import { assertEquals } from '@std/assert';

Deno.test('getSimpleDate should return plain date string', () => {
    const date = Temporal.ZonedDateTime.from('2025-10-29T16:28:17.081+01:00[Europe/Warsaw]');
    const result = getSimpleDate(date);
    assertEquals(result, '2025-10-29');
});

Deno.test('stringRepresentationOfMetadata should return correct string format', () => {
    const metadata = {
        validFrom: '2025-10-01',
        version: 4565,
        generation: 1,
    };
    const result = stringRepresentationOfMetadata(metadata);
    assertEquals(result, '2025-10-01_4565_1');
});
