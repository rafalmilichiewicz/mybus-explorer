import { NoticeSchema } from '../../../schemas/runtime/notice.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const checkDateRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Notice', 'Runtime'],
    summary: 'Get notices for each routeNumber',
    responses: {
        200: {
            description: 'Notices for each routeNumber',
            content: { 'application/json': { schema: z.array(NoticeSchema) } },
        },
        500: { description: 'Internal server error' },
    },
});

const notices = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

notices.openapi(checkDateRoute, (c) => {
    const app = c.get('app');
    const notices = app.schedule.notices;

    return c.json(notices, 200);
});
export { notices };
