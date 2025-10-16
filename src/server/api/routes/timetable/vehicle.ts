import { TimetableVehicleSchema } from '../../../schemas/schemas.ts';
import type { VariablesStandalone } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const getTimetableForVehicleRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Timetable'],
    summary: 'Get timetable for a vehicle',
    description:
        'Returns the timetable information for a specific vehicle identified by sideNumber.',
    request: {
        query: z.object({
            sideNumber: z.string().openapi({ example: '30883' }),
        }),
    },
    responses: {
        200: {
            description: 'Vehicle timetable',
            content: { 'application/json': { schema: TimetableVehicleSchema } },
        },
        400: { description: 'Invalid parameters' },
        500: { description: 'Internal server error' },
    },
});

const vehicle = new OpenAPIHono<{ Variables: VariablesStandalone }>();

vehicle.openapi(getTimetableForVehicleRoute, async (c) => {
    const { sideNumber } = c.req.valid('query');
    const api = c.get('api');

    try {
        const data = await api.timetable.getForVehicle(sideNumber);
        return c.json(data, 200);
    } catch (err) {
        console.error('Failed to get vehicle timetable:', err);
        return c.text('Internal server error', 500);
    }
});

export { vehicle };
