import { JsonParseStream } from '@std/json';
import { TextLineStream } from '@std/streams';
import { dirname } from '@std/path';

export async function checkIfFolderExists(path: string): Promise<boolean> {
    try {
        const stat = await Deno.stat(path);
        return stat.isDirectory;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) return false;
        throw err;
    }
}

export async function checkIfFileExists(path: string): Promise<boolean> {
    try {
        const stat = await Deno.stat(path);
        return stat.isFile;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) return false;
        throw err;
    }
}

export async function checkIfResourceExists(path: string): Promise<boolean> {
    try {
        const stat = await Deno.stat(path);
        return stat.isFile || stat.isDirectory;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) return false;
        throw err;
    }
}

export async function createFolder(path: string): Promise<void> {
    try {
        await Deno.mkdir(path, { recursive: true });
    } catch (err) {
        if (err instanceof Deno.errors.AlreadyExists) return;
        throw err;
    }
}

export async function copyFile(sourcePath: string, destinationPath: string): Promise<void> {
    try {
        const srcStat = await Deno.stat(sourcePath);
        if (!srcStat.isFile) {
            throw new Error(`Source path is not a file: ${sourcePath}`);
        }

        const destinationDirectory = dirname(destinationPath);
        if (!(await checkIfFolderExists(destinationDirectory))) {
            throw new Error(`Destination directory does not exist: ${destinationDirectory}`);
        }

        await Deno.copyFile(sourcePath, destinationPath);
    } catch (err) {
        console.error(`Error while copying file from ${sourcePath} -> ${destinationPath}:`, err);
        throw err;
    }
}

export async function getFileBuffer(path: string) {
    try {
        return await Deno.readFile(path);
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) return null;
        console.error(`Error reading file from ${path}:`, err);
        return null;
    }
}

export async function readJson<T>(path: string): Promise<T | null> {
    try {
        const data = await Deno.readTextFile(path);
        return JSON.parse(data) as T;
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) return null;
        console.error(`Error reading JSON from ${path}:`, err);
        return null;
    }
}

export async function saveJson(
    path: string,
    data: unknown,
    pretty?: boolean,
    keepOld?: boolean
): Promise<void> {
    const exists = await checkIfFolderExists(path);
    if (keepOld === true && exists) {
        await Deno.rename(path, `${path}.${crypto.randomUUID()}.old`);
    }
    const json = JSON.stringify(data, null, pretty ? 4 : 0);
    await Deno.writeTextFile(path, json);
}

export async function appendToJson(path: string, data: unknown): Promise<void> {
    const line = JSON.stringify(data) + '\n';
    await Deno.writeTextFile(path, line, { create: true, append: true });
}
export async function readNdjson(filename: string) {
    const file = await Deno.open(filename);

    const stream = file.readable
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream())
        .pipeThrough(new JsonParseStream());

    
    return await Array.fromAsync(stream);
}
