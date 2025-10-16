import type { Variables } from './types.ts';
import { CONFIG } from '../lib/consts/config.ts';
import { health } from './api/health.ts';
import { swaggerUI } from '@hono/swagger-ui';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
import { ApiWrapper } from '../lib/api/wrapper.ts';
import { transitPoints } from './api/routes/transit-points/transit-points.ts';
import { schedule } from './api/routes/schedule/index.ts';
import { timetable } from './api/routes/timetable/index.ts';
import { vehicles } from './api/routes/vehicles/vehicles.ts';

const app = new OpenAPIHono<{ Variables: Variables }>({ strict: false });
const api = new ApiWrapper();

app.use('*', async (c, next) => {
    c.set('api', api);
    c.set('config', CONFIG);
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
        tags: ['App'],
        description: 'Root of the app',
        summary: 'Hello message from app',
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
app.route('/vehicle', vehicles);
app.route('/schedule', schedule);
app.route('/timetable', timetable);

app.get('/ui', swaggerUI({ url: '/docs' }));
Deno.serve({ port: CONFIG.SERVER.PORT }, app.fetch);
