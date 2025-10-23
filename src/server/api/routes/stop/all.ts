import { StopSchema } from '../../../schemas/runtime/stop.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const getStopsAllRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Stop', 'Runtime'],
    summary: 'Get stops info',
    responses: {
        200: {
            description: 'Stops info',
            content: { 'application/json': { schema: z.array(StopSchema) } },
        },
        500: { description: 'Internal server error' },
    },
});

const stopsAll = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

stopsAll.openapi(getStopsAllRoute, (c) => {
    const app = c.get('app');
    const stops = app.schedule.stops;

    return c.json(stops, 200);
});
export { stopsAll };
