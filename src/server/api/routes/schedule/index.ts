import type { Variables } from "../../types.ts";
import { OpenAPIHono } from "@hono/zod-openapi";
import { database } from "./database.ts";
import { check } from "./check.ts";

const schedule = new OpenAPIHono<{Variables: Variables}>()

schedule.route("/database", database);
schedule.route("/check", check)

export {schedule};