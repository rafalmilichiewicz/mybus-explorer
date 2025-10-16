import type { Variables } from '../../../types.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import { vehicle } from './vehicle.ts';
import { stop } from './stop.ts';

const timetable = new OpenAPIHono<{ Variables: Variables }>();

timetable.route('/vehicle', vehicle);
timetable.route('/stop', stop);

export { timetable };
