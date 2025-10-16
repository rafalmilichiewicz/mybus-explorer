import type { Variables } from '../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const checkScheduleChangedRoute = createRoute({
    method: 'get',
    path: '/schedule/check',
    tags: ['Schedule'],
    summary: 'Check if schedule has changed',
    description:
        'Compares schedule version and generation values to determine if the schedule data has changed.',
    request: {
        query: z.object({
            version: z
                .string()
                .transform((v) => parseInt(v, 10))
                .refine((v) => !isNaN(v), { message: 'version must be a number' })
                .openapi({ example: '1024', description: 'Schedule version number' }),
            generation: z
                .string()
                .transform((v) => parseInt(v, 10))
                .refine((v) => !isNaN(v), { message: 'generation must be a number' })
                .openapi({ example: '5', description: 'Schedule generation number' }),
        }),
    },
    responses: {
        200: {
            description: 'Boolean flag indicating if the schedule changed',
            content: {
                'application/json': {
                    schema: z.object({
                        changed: z.boolean().openapi({ example: true }),
                    }),
                },
            },
        },
        400: { description: 'Invalid parameters' },
        500: { description: 'Internal server error' },
    },
});

const check = new OpenAPIHono<{ Variables: Variables }>();

check.openapi(checkScheduleChangedRoute, async (c) => {
    const { version, generation } = c.req.valid('query');
    const api = c.get('api');

    try {
        const changed = await api.schedule.checkIfChanged(version, generation);
        return c.json({ changed }, 200);
    } catch (err) {
        console.error('Failed to compare schedule:', err);
        return c.text('Internal server error', 500);
    }
});
export { check };
