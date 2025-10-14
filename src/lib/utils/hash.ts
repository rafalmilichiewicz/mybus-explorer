import { getFileBuffer } from './files.ts';

export const HASHING_ALGORITHM = 'SHA-256';
const textEncoder = new TextEncoder();

function bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

export async function hashObject(data: unknown) {
    const buffer = textEncoder.encode(JSON.stringify(data, null, 0));
    const digest = await crypto.subtle.digest(HASHING_ALGORITHM, buffer);

    return bufferToHex(digest);
}

export async function hashOfFile(path: string) {
    const buffer = await getFileBuffer(path);
    if (!buffer) {
        return null;
    }

    const digest = await crypto.subtle.digest(HASHING_ALGORITHM, buffer);
    return bufferToHex(digest);
}
