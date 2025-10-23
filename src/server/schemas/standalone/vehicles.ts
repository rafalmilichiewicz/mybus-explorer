import { z } from '@hono/zod-openapi';
import {
    PositionSchema,
    VehicleStatusSchema,
    RouteInfoSchema,
    VehicleFlagSchema,
    TransportModeSchema,
} from '../common.ts';

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
