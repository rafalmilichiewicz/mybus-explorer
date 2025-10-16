import { DepartureSchema } from '../../../schemas/runtime/departures.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const checkDateRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Departures', 'Runtime'],
    summary: 'Get departures for each dayType-routeNumber-routeVariant combination',
    responses: {
        200: {
            description: 'Departures for each dayType-routeNumber-routeVariant combination',
            content: { 'application/json': { schema: z.array(DepartureSchema) } },
        },
        500: { description: 'Internal server error' },
    },
});

const departures = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

departures.openapi(checkDateRoute, (c) => {
    const app = c.get('app');
    const departures = app.schedule.departures;
    console.log(departures);

    return c.json(departures,200);
});
export { departures };
