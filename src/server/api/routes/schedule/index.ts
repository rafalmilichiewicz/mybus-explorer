import type { VariablesStandalone } from '../../../types.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import { database } from './database.ts';
import { check } from './check.ts';

const schedule = new OpenAPIHono<{ Variables: VariablesStandalone }>();

schedule.route('/database', database);
schedule.route('/check', check);

export { schedule };
