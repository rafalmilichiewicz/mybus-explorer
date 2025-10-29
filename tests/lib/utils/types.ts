import { throwError } from '#src/lib/utils/types.ts';
import { assertThrows } from '@std/assert/throws';

Deno.test('trowError should throw', () => {
    assertThrows(() => {
        throwError('throwError message');
    });
});

Deno.test('throwError should throw an Error with the specified message', () => {
    const errorMessage = '418: I am a Teapot';

    assertThrows(() => throwError(errorMessage), Error, errorMessage);
});
