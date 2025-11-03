import { z } from '@hono/zod-openapi';
import { PositionSchema } from '../common.ts';

export const RouteStopSchema = z.object({
    type: z.literal('stop'),
    id: z.number().openapi({ example: 12345 }),
});

export const RoutePointSchema = z.object({
    type: z.literal('point'),
    position: PositionSchema,
});

export const TransitPointSchema = z.union([RouteStopSchema, RoutePointSchema]);

export const RouteTransitPointsSchema = z.object({
    route: z.object({
        number: z.string().openapi({ example: '550' }),
        variant: z.string().openapi({ example: 'A' }),
    }),
    points: z.array(TransitPointSchema),
});
