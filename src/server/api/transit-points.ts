import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import type { Variables } from '../types.ts';

const PositionSchema = z.object({
    lat: z.number().openapi({ example: 60.192059 }),
    lon: z.number().openapi({ example: 24.945831 }),
});

const RouteStopSchema = z.object({
    type: z.literal('stop'),
    id: z.number().openapi({ example: 12345 }),
});

const RoutePointSchema = z.object({
    type: z.literal('point'),
    position: PositionSchema,
});

const TransitPointSchema = z.union([RouteStopSchema, RoutePointSchema]);

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
    },
});

const transitPoints = new OpenAPIHono<{ Variables: Variables }>();
transitPoints.openapi(getRouteTransitPointsRoute, async (c) => {
    const api = c.get('api');
    const { routeNumber, routeVariant } = c.req.valid('query');
    const data = (await api.getTransitPointsForRoute(routeNumber, routeVariant)) as z.infer<
        typeof RouteTransitPointsSchema
    >;
    return c.json(data, 200);
});

export { transitPoints };
