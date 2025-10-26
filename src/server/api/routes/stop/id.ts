import { StopSchema } from '../../../schemas/runtime/stop.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const stopByIdRoute = createRoute({
    method: 'get',
    path: '/:id',
    tags: ['Stop', 'Runtime'],
    summary: 'Get stops info by SIP ID',
    request: {
        params: z.object({
            id: z
                .string()
                .transform((v) => Number.parseInt(v))
                .refine((v) => !isNaN(v), { message: 'version must be a number' })
                .openapi({ example: '1024', description: 'Stop SIP ID' }),
        }),
    },
    responses: {
        200: {
            description: 'Stops info by SIP ID',
            content: { 'application/json': { schema: StopSchema } },
        },
        400: { description: 'Invalid parameters' },
        404: { description: 'No stop found for the given id' },
        500: { description: 'Internal server error' },
    },
});

const stopById = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

stopById.openapi(stopByIdRoute, (c) => {
    const app = c.get('app');
    const { id } = c.req.valid('param');

    try {
        const stop = app.schedule.stops.find((el) => el.idSip === id);

        if (!stop) return c.text('No stop found for the given id', 404);

        return c.json(stop, 200);
    } catch (err) {
        console.error('Failed to find stop by id', err);
        return c.text('Failed to find stop by id', 500);
    }
});
export { stopById };
