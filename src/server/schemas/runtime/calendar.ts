import { z } from "@hono/zod-openapi";

export const DaySchema = z.object({
  type: z.string().openapi({ example: 'HOLIDAY' }),
  description: z.string().openapi({ example: 'Public holiday' }),
  displayOrder: z.number().openapi({ example: 1 }),
})

export const CalendarEntrySchema = z.object({
  dayType: z.string().openapi({ example: 'HOLIDAY' }),
  date: z.string().openapi({ format: 'date', example: '2025-10-16' }),
})

export const CalendarSchema = z.object({
  types: z.array(DaySchema),
  entries: z.array(CalendarEntrySchema),
})
