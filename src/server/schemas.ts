import { z } from '@hono/zod-openapi';

export const TrackingStatusSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    status: z.string().openapi({ example: 'WITHIN_STOP_AREA' }),
});

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

export const VehicleStopInfoSchema = z.object({
    stop: z.object({
        numberEnRoute: z.number().openapi({ example: 3 }),
        idSip: z.number().openapi({ example: 330 }),
        name: z.string().openapi({ example: 'WYŚCIGOWA 02' }),
    }),
    time: z.object({
        label: z.string().openapi({ example: '09:30' }),
        seconds: z.number().openapi({ example: 34200 }),
    }),
    status: TrackingStatusSchema,
});

export const TimetableVehicleSchema = z.object({
    id: z.number().openapi({ example: 330 }),
    route: z.object({
        number: z.string().openapi({ example: '160' }),
        variant: z.string().openapi({ example: 'B' }),
        destination: z.string().openapi({ example: 'Choiny' }),
    }),
    stops: z.array(VehicleStopInfoSchema),
});

export const DepartureTimeSchema = z.object({
    time: z.string().openapi({ example: '2025-10-16T09:25:00Z' }),
    seconds: z.number().openapi({ example: 34200 }),
    label: z.string().openapi({ example: '09:30' }),
});

export const StopDepartureInfoSchema = z.object({
    id: z.string().openapi({ example: '330' }),
    estimatedDeparture: DepartureTimeSchema,
    trackingStatus: z.object({
        id: z.number().openapi({ example: 1 }),
        status: z.string().openapi({ example: 'WITHIN_STOP_AREA' }),
    }),
    destination: z.string().openapi({ example: 'Choiny' }),
    route: z.object({
        number: z.string().openapi({ example: '550' }),
        direction: RouteDirectionSchema,
        id: z.string().openapi({ example: '550T' }),
    }),
    vehicle: z.object({
        sideNumber: z.string().openapi({ example: '1201' }),
        type: TransportModeSchema,
        flags: z.array(VehicleFlagSchema),
    }),
});

export const TimetableStopSchema = z.object({
    stopIdSip: z.number().openapi({ example: 330 }),
    currentTime: z.string().openapi({ example: '2025-10-16T09:25:00Z' }),
    departures: z.array(StopDepartureInfoSchema),
});
