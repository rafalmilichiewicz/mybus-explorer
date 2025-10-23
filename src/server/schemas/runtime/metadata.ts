import { z } from '@hono/zod-openapi';

export const ScheduleMetadataSchema = z.object({
    validFrom: z.string(),
    version: z.number(),
    generation: z.number(),
});

export const ServerMetadataSchema = z.object({
    cityId: z.string(),
    scheduleMetadata: ScheduleMetadataSchema,
    lastEditDate: z.iso.datetime(), // This should be a 1:1 Temporal API
    checksum: z.object({
        patches: z.string(),
        db: z.string(),
    }),
});
