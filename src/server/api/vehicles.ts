import type { Variables } from '../types.ts';
import { VehicleEnRouteSchema } from '../schemas.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const getOnlineVehiclesRoute = createRoute({
    method: 'get',
    path: '/vehicles',
    summary: 'Get online vehicles',
    description:
        'Returns a list of currently online vehicles, optionally filtered by route number.',
    request: {
        query: z.object({
            route: z.string().optional().openapi({
                example: '160',
                description: 'Optional route number to filter vehicles',
            }),
        }),
    },
    responses: {
        200: {
            description: 'List of vehicles currently operating',
            content: {
                'application/json': {
                    schema: z.array(VehicleEnRouteSchema),
                },
            },
        },
        400: { description: 'Invalid parameters' },
        500: {
            description: 'Internal server error',
        },
    },
});

const onlineVehiclesApp = new OpenAPIHono<{ Variables: Variables }>();

onlineVehiclesApp.openapi(getOnlineVehiclesRoute, async (c) => {
    const { route } = c.req.valid('query');
    const api = c.get('api');

    try {
        const data = await api.getOnlineVehicles(route ?? '');
        return c.json(data, 200);
    } catch (error) {
        console.error('Failed to fetch vehicles:', error);
        return c.text('Internal server error', 500);
    }
});

export {};
