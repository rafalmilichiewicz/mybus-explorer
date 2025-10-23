import type { ScheduleMetadata } from "../lib/db/schema/metadata.ts";


export type ServerMetadata = {
    cityId: string;
    scheduleMetadata: ScheduleMetadata;
    lastEditDate: Temporal.ZonedDateTime;
    checksum: {
        patches: string;
        db: string;
    };
};
