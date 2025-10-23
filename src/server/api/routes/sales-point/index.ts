import { SalesPointSchema } from '../../../schemas/runtime/sales-point.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const checkDateRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Sales Point', 'Runtime'],
    summary: 'Get sales points',
    responses: {
        200: {
            description: 'Sales points',
            content: { 'application/json': { schema: z.array(SalesPointSchema) } },
        },
        500: { description: 'Internal server error' },
    },
});

const salesPoints = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

salesPoints.openapi(checkDateRoute, (c) => {
    const app = c.get('app');
    const salesPoints = app.schedule.salesPoints;

    return c.json(salesPoints, 200);
});
export { salesPoints };
