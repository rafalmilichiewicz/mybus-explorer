import { CONFIG } from '../lib/consts/config.ts';
import { health } from './api/health.ts';
import { SwaggerUI, swaggerUI } from '@hono/swagger-ui';
import { docs } from './docs.ts';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono({ strict: false });

import { z } from '@hono/zod-openapi';
import { Hono } from 'hono';

app.route('/health', health);
app.route('/docs', docs);
app.openapi(
    createRoute({
        path: '/',
        method: 'get',
        responses: {
            200: {
                content: {
                    'text/plain': {
                        schema: z.string(),
                    },
                },
                description: 'Hello message from app',
            },
        },
    }),
    (c) => {
        return c.text('Hello from MyBus Explorer!');
    }
);

app.doc('/docs', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'My API',
    },
});
app.get('/ui', swaggerUI({ url: '/docs' }),);
Deno.serve({ port: CONFIG.SERVER.PORT }, app.fetch);

// const b = new Hono();
// b.get('/swagger', swaggerUI({ url: '/doc' }));
