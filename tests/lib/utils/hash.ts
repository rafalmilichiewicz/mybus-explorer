import { assertEquals, assertNotEquals } from '@std/assert';
import { bufferToHex, hashObject } from '#src/lib/utils/hash.ts';

const regret = /^[0-9a-f]+$/;

Deno.test('bufferToHex should correctly convert various byte patterns', () => {
    const testCases = [
        { input: new Uint8Array([0x00]).buffer, expected: '00' },
        { input: new Uint8Array([0x01]).buffer, expected: '01' },
        { input: new Uint8Array([0x0f]).buffer, expected: '0f' },
        { input: new Uint8Array([0x10]).buffer, expected: '10' },
        { input: new Uint8Array([0xff]).buffer, expected: 'ff' },
        { input: new Uint8Array([0x00, 0x01]).buffer, expected: '0001' },
        { input: new Uint8Array([0x12, 0x34]).buffer, expected: '1234' },
        { input: new Uint8Array([0xab, 0xcd, 0xef]).buffer, expected: 'abcdef' },
        { input: new Uint8Array([0x00, 0x00, 0x00, 0x00]).buffer, expected: '00000000' },
    ];

    testCases.forEach(({ input, expected }) => {
        const result = bufferToHex(input);
        assertEquals(result, expected);
    });
});

Deno.test('hashObject should return consistent hash for same input', async () => {
    const data = { name: 'test', value: 123 };

    const hash1 = await hashObject(data);
    const hash2 = await hashObject(data);

    assertEquals(hash1, hash2);
});

Deno.test('hashObject should return different hashes for different inputs', async () => {
    const data1 = { name: 'test', value: 123 };
    const data2 = { name: 'test', value: 456 };

    const hash1 = await hashObject(data1);
    const hash2 = await hashObject(data2);

    assertNotEquals(hash1, hash2);
});

Deno.test('hashObject should handle nested objects', async () => {
    const data = {
        user: {
            id: 1,
            name: 'John',
            profile: {
                email: 'john@example.com',
            },
        },
        timestamp: '2023-12-25T10:30:00Z',
    };

    const result = await hashObject(data);

    assertEquals(typeof result, 'string');
    assertEquals(result.length, 64);
    assertEquals(regret.test(result), true);
});

Deno.test('hashObject should handle arrays', async () => {
    const data = [1, 2, 3, 'test'];
    const result = await hashObject(data);

    assertEquals(typeof result, 'string');
    assertEquals(result.length, 64);
    assertEquals(regret.test(result), true);
});

Deno.test('hashObject should handle empty objects', async () => {
    const data = {};
    const result = await hashObject(data);

    assertEquals(typeof result, 'string');
    assertEquals(result.length, 64);
    assertEquals(regret.test(result), true);
});

Deno.test('hashObject should handle null and undefined', async () => {
    const data = null;
    const result = await hashObject(data);

    assertEquals(typeof result, 'string');
    assertEquals(result.length, 64);
    assertEquals(regret.test(result), true);
});

Deno.test('hashObject should handle primitive values', async () => {
    const data = 'hello world';
    const result = await hashObject(data);

    assertEquals(typeof result, 'string');
    assertEquals(result.length, 64);
    assertEquals(regret.test(result), true);
});

