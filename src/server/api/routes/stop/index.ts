import type { VariablesStandalone } from '../../../types.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import { stopsAll } from './all.ts';
import { stopById } from './id.ts';

const stops = new OpenAPIHono<{ Variables: VariablesStandalone }>();

stops.route('/', stopsAll);
stops.route('/', stopById);

export { stops };
