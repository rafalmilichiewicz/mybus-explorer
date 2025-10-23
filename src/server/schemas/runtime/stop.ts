import { z } from '@hono/zod-openapi';

export const StopSchema = z.object({
    idSip: z.number(),
    idZtm: z.number(),
    streetId: z.number(),
    streetName: z.string(),
    order: z.number(),
    description: z.string(),
    groupName: z.string(),
    groupNumber: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    linesBus: z.array(z.string()),
    linesTram: z.array(z.string()),
    linesTrolleybus: z.array(z.string()),
    destinations: z.array(z.string()),
    transportMode: z.string(),
    _post: z.unknown().optional(),
    _tabType: z.unknown().optional(),
});
