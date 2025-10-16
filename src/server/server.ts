import { CONFIG } from '../lib/consts/config.ts';
import { health } from './api/health.ts';
import { swaggerUI } from '@hono/swagger-ui';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
import { ApiWrapper } from '../lib/api/wrapper.ts';
import type { Variables } from './types.ts';
import { transitPoints } from './api/transit-points.ts';

const app = new OpenAPIHono<{ Variables: Variables }>({ strict: false });
const api = new ApiWrapper();

app.use('*', async (c, next) => {
    c.set('api', api);
    await next();
});

app.doc('/docs', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'MyBus Explorer API',
    },
});
app.openapi(
    createRoute({
        path: '/',
        method: 'get',
        description: "Root of the app",
        summary: "Hello message from app",
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
app.route('/health', health);
app.route('/transit-points', transitPoints);

app.get('/ui', swaggerUI({ url: '/docs' }));
Deno.serve({ port: CONFIG.SERVER.PORT }, app.fetch);

