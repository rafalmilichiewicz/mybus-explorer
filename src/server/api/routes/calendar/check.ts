import { CalendarEntrySchema } from '../../../schemas/runtime/calendar.ts';
import type { VariablesWithRuntime } from '../../../types.ts';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const checkDateRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Calendar', 'Runtime'],
    summary: 'Check calendar for a given date',
    request: {
        query: z.object({
            date: z.iso
                .date()

                .openapi({ example: '2025-10-16', description: 'Date in YYYY-MM-DD format' }),
        }),
    },
    responses: {
        200: {
            description: 'Calendar entry for the given date',
            content: { 'application/json': { schema: CalendarEntrySchema } },
        },
        404: { description: 'No entry found for the given date' },
        500: { description: 'Internal server error' },
    },
});

const calendarCheck = new OpenAPIHono<{ Variables: VariablesWithRuntime }>();

calendarCheck.openapi(checkDateRoute, (c) => {
    const { date } = c.req.valid('query');
    const app = c.get('app');

    const parsedDate = Temporal.PlainDate.from(date);

    const entry = app.schedule.calendar.entries.find((el) => el.date.equals(parsedDate));

    if (!entry) return c.text('No entry for this date', 404);

    return c.json(entry);
});
export { calendarCheck };
