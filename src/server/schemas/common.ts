import { z } from '@hono/zod-openapi';

export const TrackingStatusSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    status: z.string().openapi({ example: 'WITHIN_STOP_AREA' }),
});

export const PositionSchema = z.object({
    longitude: z.number().openapi({ example: 24.945831 }),
    latitude: z.number().openapi({ example: 60.192059 }),
});

export const RouteDirectionSchema = z.object({
    id: z.string().openapi({ example: 'T' }),
    type: z.string().openapi({ example: 'outbound' }),
});

export const RouteInfoSchema = z.object({
    number: z.string().openapi({ example: '160' }),
    destination: z.string().openapi({ example: 'Choiny' }),
    variant: z.string().openapi({ example: 'B' }),
    direction: RouteDirectionSchema,
    id: z.string().openapi({ example: '160' }),
});

export const VehicleStatusSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    flags: z
        .object({
            moving: z.boolean(),
            enRoute: z.boolean(),
        })
        .optional(),
});

export const VehicleFlagSchema = z.object({
    id: z.string().openapi({ example: 'E' }),
    feature: z.string().openapi({ example: 'electric' }),
});

export const TransportModeSchema = z.object({
    id: z.string().openapi({ example: 'T' }),
    type: z.string().openapi({ example: 'tram' }),
});

export const DepartureTimeSchema = z.object({
    time: z.string().openapi({ example: '2025-10-16T09:25:00Z' }),
    seconds: z.number().openapi({ example: 34200 }),
    label: z.string().openapi({ example: '09:30' }),
});
