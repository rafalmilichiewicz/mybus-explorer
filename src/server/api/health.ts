import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const health = new OpenAPIHono();
health.openapi(
    createRoute({
        path: '/',
        method: 'get',
        description: 'Check app health',
        summary: 'App health status',
        responses: {
            200: {
                content: {
                    'text/plain': {
                        schema: z.string(),
                    },
                },
                description: 'Health check',
            },
        },
    }),
    (c) => {
        return c.text('OK');
    }
);
export { health };
