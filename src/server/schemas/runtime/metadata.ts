import { z } from '@hono/zod-openapi';

export const ScheduleMetadataSchema = z.object({
    validFrom: z.string().openapi({ example: '2025-10-01' }),
    version: z.number().openapi({ example: 4565 }),
    generation: z.number().openapi({ example: 1 }),
});

export const ServerMetadataSchema = z.object({
    cityId: z.string().openapi({ example: 'lublin' }),
    scheduleMetadata: ScheduleMetadataSchema,
    lastEditDate: z.iso
        .datetime()
        .openapi({ example: '2025-10-16T17:06:15.456+02:00[Europe/Warsaw]' }), // This should be a 1:1 Temporal API
    checksum: z.object({
        patches: z
            .string()
            .openapi({
                example: '201fe35eb93b77c92830669a0f5344d71c8bbfbfccfa503a1900e212c52ac8ab',
            }),
        db: z
            .string()
            .openapi({
                example: '6893e8c7a8e05760d0e0e800a8bc0b9f88995c3c15f8f6f52cdffb429b09c5be',
            }),
    }),
});
