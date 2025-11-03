import { z } from '@hono/zod-openapi';

export const StreetSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Lipowa' }),
});
