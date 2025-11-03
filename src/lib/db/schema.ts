import { CALENDAR_TABLE } from './schema/calendar.ts';
import { CONFIG_TABLE } from './schema/config.ts';
import { DAYS_TABLE } from './schema/day.ts';
import { DEPARTURES_TABLE } from './schema/departure.ts';
import { DESTINATIONS_TABLE } from './schema/destination.ts';
import { METADATA_TABLE } from './schema/metadata.ts';
import { NOTICES_TABLE } from './schema/notice.ts';
import { SALES_POINTS_TABLE } from './schema/sales-point.ts';
import { STOPS_TABLE } from './schema/stop.ts';
import { STREETS_TABLE } from './schema/street.ts';

export const SCHEMA = {
    CALENDAR: CALENDAR_TABLE,
    CONFIG: CONFIG_TABLE,
    DAYS: DAYS_TABLE,
    DESTINATIONS: DESTINATIONS_TABLE,
    DEPARTURES: DEPARTURES_TABLE,
    STOPS: STOPS_TABLE,
    SALES_POINTS: SALES_POINTS_TABLE,
    STREETS: STREETS_TABLE,
    NOTICES: NOTICES_TABLE,
    METADATA: METADATA_TABLE,
} as const;

// TODO DB Diagram
