import { RouteSchema } from '../../../schemas/runtime/routes.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const routesRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Routes', 'Runtime'],
    summary: 'Get routes for each routeNumber-routeVariant combination',
    responses: {
        200: {
            description: 'Route for each routeNumber-routeVariant combination',
            content: { 'application/json': { schema: z.array(RouteSchema) } },
        },
        500: { description: 'Internal server error' },
    },
});

const routes = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

routes.openapi(routesRoute, (c) => {
    const app = c.get('app');
    const routes = app.schedule.routes;

    return c.json(routes, 200);
});
export { routes };
