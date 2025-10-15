import { OpenAPIHono } from "@hono/zod-openapi";

const health = new OpenAPIHono();
health.get("/",(c) => c.text('OK'));

export { health };
