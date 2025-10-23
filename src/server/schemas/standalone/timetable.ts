import { z } from "@hono/zod-openapi";
import { DepartureTimeSchema, RouteDirectionSchema, TrackingStatusSchema, TransportModeSchema, VehicleFlagSchema } from "../common.ts";

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