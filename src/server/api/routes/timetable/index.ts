import type { VariablesStandalone } from '../../../types.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import { vehicle } from './vehicle.ts';
import { stop } from './stop.ts';

const timetable = new OpenAPIHono<{ Variables: VariablesStandalone }>();

timetable.route('/vehicle', vehicle);
timetable.route('/stop', stop);

export { timetable };
