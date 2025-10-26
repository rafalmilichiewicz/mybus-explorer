import { z } from '@hono/zod-openapi';
import { RouteDirectionSchema, TransportModeSchema } from '../common.ts';

export const RouteSchema = z.object({
    id: z.number().openapi({ example: 428061 }),
    number: z.string().openapi({ example: '160' }),
    transportMode: TransportModeSchema,
    direction: z.string().openapi({ example: 'OS.PORĘBA' }),
    stops: z.array(z.number()).openapi({
        example: [
            909, 899, 1280, 73, 71, 68, 95, 93, 91, 101, 99, 97, 12, 151, 244, 249, 322, 1002, 327,
            329, 332, 353, 355, 357, 363, 385, 383, 396, 417, 529, 531, 515, 517, 568, 569,
        ],
    }),
    variant: z.string().openapi({ example: 'B' }),
    night: z.boolean().openapi({ example: false }),
    depot: z.boolean().openapi({ example: false }),
    routeKey: z
        .string()
        .regex(/^[^-\s]+-[a-zA-Z0-9]+$/)
        .openapi({ example: '160-B' }),
    routeDirection: RouteDirectionSchema,
    routeCode: z.number().openapi({ example: 160 }),
    _defaultVariant: z.unknown(),
    _description: z.unknown(),
    _descriptionNumber: z.unknown(),
});
