import { z } from '@hono/zod-openapi';

export const ConfigSchema = z.object({
    TripPlannerEnabled: z.boolean(),
    TripPlannerVersion: z.string().openapi({ example: '2' }),
    StreetsEnabled: z.boolean(),
    VehicleNotesEnabled: z.boolean(),
    VehicleSideNumberEnabled: z.boolean(),
    VehicleVarianceEnabled: z.boolean(),
    _others: z.record(z.string(), z.string().optional()),
});
