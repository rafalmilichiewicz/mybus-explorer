import { assertEquals } from '@std/assert';

Deno.test('Sanity check', () => {
    assertEquals(true, !false, 'Something went terribly wrong - Consult your local authorities');
});
