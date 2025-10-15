import { Hono } from 'hono';
import { CONFIG } from '../lib/consts/config.ts';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

Deno.serve({ port: CONFIG.SERVER.PORT }, app.fetch);
