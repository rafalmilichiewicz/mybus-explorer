import { CalendarEntrySchema } from '../../../schemas/runtime/calendar.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const todayRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Calendar', 'Runtime'],
    summary: "Get today's calendar entry",
    responses: {
        200: {
            description: 'Calendar entry for today',
            content: { 'application/json': { schema: CalendarEntrySchema } },
        },
        404: { description: 'No entry for today' },
        500: { description: 'Internal server error' },
    },
});

const calendarToday = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

calendarToday.openapi(todayRoute, (c) => {
    const app = c.get('app');
    const today = Temporal.Now.plainDateISO();
    const entry = app.schedule.calendar.entries.find((el) => el.date.equals(today));
    if (!entry) return c.text('No entry for today', 404);
    return c.json(entry);
});

export { calendarToday };
