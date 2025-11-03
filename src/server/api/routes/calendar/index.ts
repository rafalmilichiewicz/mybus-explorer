import type { VariablesWithRuntime } from '../../../types.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import { calendarAll } from './all.ts';
import { calendarCheck } from './check.ts';
import { calendarToday } from './today.ts';

const calendar = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

calendar.route('/', calendarAll);
calendar.route('/check', calendarCheck);
calendar.route('/today', calendarToday);

export { calendar };
