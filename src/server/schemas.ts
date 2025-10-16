import { z } from '@hono/zod-openapi';

export const PositionSchema = z.object({
    longitude: z.number().openapi({ example: 24.945831 }),
    latitude: z.number().openapi({ example: 60.192059 }),
});

export const RouteStopSchema = z.object({
    type: z.literal('stop'),
    id: z.number().openapi({ example: 12345 }),
});

export const RoutePointSchema = z.object({
    type: z.literal('point'),
    position: PositionSchema,
});

export const TransitPointSchema = z.union([RouteStopSchema, RoutePointSchema]);

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

export const VehicleEnRouteSchema = z.object({
    id: z.string().openapi({ example: '12345' }),
    sideNumer: z.string().openapi({ example: '30883' }),
    position: PositionSchema,
    _positionP: PositionSchema,
    status: VehicleStatusSchema,
    currentRoute: RouteInfoSchema,
    nextRoute: RouteInfoSchema,
    delay: z.number().openapi({ example: 45 }),
    flags: z.array(VehicleFlagSchema),
    type: TransportModeSchema,
    nextStopOnRouteIndex: z.number().openapi({ example: 3 }),
    brigade: z.string().openapi({ example: '160/03' }),
    plannedDepartureTime: z.string().openapi({ example: '14:17' }),
});
