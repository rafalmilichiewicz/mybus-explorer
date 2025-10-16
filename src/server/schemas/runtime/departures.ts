import { z } from '@hono/zod-openapi';

export const DepartureTimeSchema = z.object({
    seconds: z.number(),
    hour: z.number(),
    minute: z.number(),
    label: z.string(),
});

export const DepartureSchema = z.object({
  destinationId: z.number(),
  dayType: z.string(),
  routeVariant: z.string(),
  stopIdSip: z.number(),
  stopNumberOnRoute: z.number(),
  lineNumber: z.string(),
  departureTimes: z.array(DepartureTimeSchema)
});

