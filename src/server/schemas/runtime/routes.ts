import { z } from '@hono/zod-openapi';
import { RouteDirectionSchema, TransportModeSchema } from '../common.ts';

export const RouteSchema = z.object({
    id: z.number(),
    number: z.string(),
    transportMode: TransportModeSchema,
    direction: z.string(),
    stops: z.array(z.number()),
    variant: z.string(),
    night: z.boolean(),
    depot: z.boolean(),
    routeKey: z.string().regex(/^[^-\s]+-[a-zA-Z0-9]+$/),
    routeDirection: RouteDirectionSchema,
    routeCode: z.number(),
    _defaultVariant: z.unknown(),
    _description: z.unknown(),
    _descriptionNumber: z.unknown(),
});
