import { z } from '@hono/zod-openapi';

export const NoticeSchema = z.object({
    routeNumber: z.array(z.string()),
    name: z.string(),
    content: z.string(),
});
