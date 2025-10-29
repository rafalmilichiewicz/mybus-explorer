import { assertEquals } from '@std/assert/equals';
import { naturalSort } from '#src/lib/utils/natural-sort.ts';

Deno.test('naturalSort should sort numbers before strings', () => {
    const result = naturalSort('10', 'Bia');
    assertEquals(result, -1);
});

Deno.test('naturalSort should sort strings after numbers', () => {
    const result = naturalSort('Bia', '10');
    assertEquals(result, 1);
});

Deno.test('naturalSort should sort strings alphabetically', () => {
    const result = naturalSort('Zie', 'Bia');
    assertEquals(result, 1);
});

Deno.test('naturalSort should sort identical numbers', () => {
    const result = naturalSort('5', '5');
    assertEquals(result, 0);
});

Deno.test('naturalSort should sort identical strings', () => {
    const result = naturalSort('GAJ', 'GAJ');
    assertEquals(result, 0);
});

Deno.test('naturalSort should sort array using the function', () => {
    const items = ['950', '160', '38', 'GAJ', 'Bia', 'Zie', 'Zie'];
    const sorted = items.toSorted(naturalSort);

    // Expected order: numbers first (38,160,950), then strings (Bia,GAJ,Zie,Zie)

    const expected = ['38', '160', '950', 'Bia', 'GAJ', 'Zie', 'Zie'];

    assertEquals(sorted, expected);
});

Deno.test('naturalSort should handle edge case: empty string vs empty string', () => {
    const result = naturalSort('', '');
    assertEquals(result, 0);
});
