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
    routes: z.object({
        bus: z.array(z.string()),
        tram: z.array(z.string()),
        trolleybus: z.array(z.string()),
    }),
    destinations: z.array(z.string()),
    transportMode: z.string(),
    _post: z.unknown().optional(),
    _tabType: z.unknown().optional(),
});
