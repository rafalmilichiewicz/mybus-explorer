import { z } from '@hono/zod-openapi';
import { PositionSchema } from '../common.ts';

export const SalesPointDescriptionSchema = z.enum([
    'ztm',
    'lubika',
    'kiosk',
    'external',
    '_unknown',
]);

export const SalesPointTypeSchema = z.object({
    id: z.number(),
    description: SalesPointDescriptionSchema,
});

export const SalesPointSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: SalesPointTypeSchema,
    position: PositionSchema,
});
