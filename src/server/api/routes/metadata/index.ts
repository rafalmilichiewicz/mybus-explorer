import { ServerMetadataSchema } from '../../../schemas/runtime/metadata.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const checkDateRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Metadata', 'Runtime'],
    summary: 'Get server and schedule metadata',
    responses: {
        200: {
            description: 'Server and schedule metadata',
            content: { 'application/json': { schema: ServerMetadataSchema } },
        },
        500: { description: 'Internal server error' },
    },
});

const metadata = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

metadata.openapi(checkDateRoute, (c) => {
    const app = c.get('app');
    const metadata = app.metadata;

    return c.json(metadata, 200);
});
export { metadata };
