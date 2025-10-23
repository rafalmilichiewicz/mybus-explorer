import { z } from "@hono/zod-openapi";

export const StreetSchema = z.object({
    id: z.number(),
    name: z.string(),
})