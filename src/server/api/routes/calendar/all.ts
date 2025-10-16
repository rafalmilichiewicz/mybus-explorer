import { CalendarSchema } from '../../../schemas/runtime/calendar.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const getCalendarRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Calendar', "Runtime"],
    summary: 'Get all calendar entries',
    description: 'Returns all calendar entries with their day types.',
    responses: {
        200: {
            description: 'Full calendar',
            content: { 'application/json': { schema: CalendarSchema } },
        },
        500: { description: 'Internal server error' },
    },
});

const calendarAll = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

calendarAll.openapi(getCalendarRoute, (c) => {
    const app = c.get('app');
    return c.json(app.schedule.calendar);
});

export { calendarAll };
