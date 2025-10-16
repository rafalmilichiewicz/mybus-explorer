import { TimetableStopSchema } from '../../../schemas/schemas.ts';
import type { Variables } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const getTimetableForStopRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Timetable'],
    summary: 'Get timetable for a stop',
    description: 'Returns timetable information for a specific stop identified by stop ID.',
    request: {
        query: z.object({
            stop: z
                .string()
                .transform((v) => parseInt(v, 10))
                .refine((v) => !isNaN(v), { message: 'stop must be a number' })
                .openapi({ example: '330', description: 'Stop Sip Id' }),
        }),
    },
    responses: {
        200: {
            description: 'Stop timetable',
            content: { 'application/json': { schema: TimetableStopSchema } },
        },
        400: { description: 'Invalid parameters' },
        500: { description: 'Internal server error' },
    },
});

const stop = new OpenAPIHono<{ Variables: Variables }>();

stop.openapi(getTimetableForStopRoute, async (c) => {
    const { stop } = c.req.valid('query');
    const api = c.get('api');

    try {
        const data = await api.timetable.getForStop(stop);
        return c.json(data, 200);
    } catch (err) {
        console.error('Failed to get stop timetable:', err);
        return c.text('Internal server error', 500);
    }
});

export { stop };
