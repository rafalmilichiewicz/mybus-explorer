import denoInfo from "../../deno.json" with {type: "json"};

import type { VariablesWithRuntime } from './types.ts';
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
import { AppRuntime } from './runtime/runtime.ts';
import { calendar } from './api/routes/calendar/index.ts';
import { config } from './api/routes/config/index.ts';
import { departures } from './api/routes/departures/index.ts';
import { routes } from './api/routes/route/index.ts';
import { metadata } from "./api/routes/metadata/index.ts";
import { notices } from "./api/routes/notice/index.ts";
import { salesPoints } from "./api/routes/sales-point/index.ts";

const app = new OpenAPIHono<{ Variables: VariablesWithRuntime }>({ strict: false });
const api = new ApiWrapper();

app.use('*', async (c, next) => {
    c.set('api', api);
    c.set('config', CONFIG);
    await next();
});

app.doc('/docs', {
    openapi: '3.0.0',
    info: {
        version: denoInfo.version, // TODO Get app version from deno.json
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

if (!CONFIG.SERVER.STANDALONE) {
    console.log('Initializing app runtime...');
    const runtime = await AppRuntime.initialize(api);
    app.use('*', async (c, next) => {
        c.set('app', runtime);
        await next();
    });

    app.route('/calendar', calendar);
    app.route('/config', config);
    app.route('/departure', departures);
    app.route('/route', routes);
    app.route("/metadata", metadata);
    app.route("/notice", notices);
    app.route("sales-point", salesPoints);
}

app.get('/ui', swaggerUI({ url: '/docs' }));
Deno.serve({ port: CONFIG.SERVER.PORT }, app.fetch);
