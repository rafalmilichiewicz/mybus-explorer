import { StreetSchema } from '../../../schemas/runtime/street.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const streetsRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Street', 'Runtime'],
    summary: 'Get streets',
    responses: {
        200: {
            description: 'Streets',
            content: { 'application/json': { schema: z.array(StreetSchema) } },
        },
        500: { description: 'Internal server error' },
    },
});

const streets = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

streets.openapi(streetsRoute, (c) => {
    const app = c.get('app');
    const streets = app.schedule.streets;

    return c.json(streets, 200);
});
export { streets };
