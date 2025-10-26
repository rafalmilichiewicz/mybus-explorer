import { z } from '@hono/zod-openapi';
import { PositionSchema } from '../common.ts';

export const SalesPointDescriptionSchema = z
    .enum(['ztm', 'lubika', 'kiosk', 'external', '_unknown'])
    .openapi({ example: 'ztm' });

export const SalesPointTypeSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    description: SalesPointDescriptionSchema,
});

export const SalesPointSchema = z.object({
    id: z.number().openapi({ example: 3 }),
    name: z.string().openapi({ example: 'DWORZEC LUBLIN' }),
    type: SalesPointTypeSchema,
    position: PositionSchema,
});
