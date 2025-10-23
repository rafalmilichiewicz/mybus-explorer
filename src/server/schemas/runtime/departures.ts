import { z } from '@hono/zod-openapi';

export const DepartureTimeSchema = z.object({
    seconds: z.number().openapi({ example: 19500 }),
    hour: z.number().openapi({ example: 5 }),
    minute: z.number().openapi({ example: 25 }),
    label: z.string().openapi({ example: '05:25' }),
});

export const DepartureSchema = z.object({
    destinationId: z.number().openapi({ example: 428054 }),
    dayType: z.string().openapi({ example: 'PN' }),
    route: z.object({
        number: z.string().openapi({ example: '13' }),
        variant: z.string().openapi({ example: 'D' }),
    }),
    stopIdSip: z.number().openapi({ example: 1 }),
    stopNumberOnRoute: z.number().openapi({ example: 18 }),
    departureTimes: z.array(DepartureTimeSchema),
});
