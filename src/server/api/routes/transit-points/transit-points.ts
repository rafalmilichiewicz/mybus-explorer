import type { Variables } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { TransitPointSchema } from '../../../schemas/schemas.ts';

const RouteTransitPointsSchema = z.object({
    route: z.object({
        number: z.string().openapi({ example: '550' }),
        variant: z.string().openapi({ example: 'A' }),
    }),
    points: z.array(TransitPointSchema),
});

const getRouteTransitPointsRoute = createRoute({
    path: '/',
    method: 'get',
    tags: ["Transit Points"],
    summary: 'Get route transit points',
    description:
        'Returns the ordered list of stops and intermediate points for a given route number and variant.',
    request: {
        query: z.object({
            routeNumber: z.string().openapi({ example: '160' }),
            routeVariant: z.string().openapi({ example: 'B' }),
        }),
    },
    responses: {
        200: {
            description: 'List of route transit points',
            content: {
                'application/json': {
                    schema: RouteTransitPointsSchema,
                },
            },
        },
        400: { description: 'Invalid parameters' },
        500: {
            description: 'Internal server error',
        },
    },
});

const transitPoints = new OpenAPIHono<{ Variables: Variables }>();
transitPoints.openapi(getRouteTransitPointsRoute, async (c) => {
    const api = c.get('api');
    const { routeNumber, routeVariant } = c.req.valid('query');

    try {
        const data = (await api.getTransitPointsForRoute(routeNumber, routeVariant)) as z.infer<
            typeof RouteTransitPointsSchema
        >;
        return c.json(data, 200);
    } catch (error) {
        console.error('Failed to fetch vehicles:', error);
        return c.text('Internal server error', 500);
    }
});

export { transitPoints };
