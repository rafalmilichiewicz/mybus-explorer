import { ConfigSchema } from '../../../schemas/runtime/config.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const configRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Config', 'Runtime'],
    summary: 'Get config of a database of loaded city',
    description: 'Returns config of a database of loaded city',
    responses: {
        200: {
            description: 'Database config',
            content: { 'application/json': { schema: ConfigSchema } },
        },
        500: { description: 'Internal server error' },
    },
});

const config = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

config.openapi(configRoute, (c) => {
    const app = c.get('app');

    return c.json(app.schedule.config, 200);
});

export { config };
