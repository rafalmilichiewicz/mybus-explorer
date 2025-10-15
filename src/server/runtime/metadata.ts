import type { Metadata } from '../../lib/db/schema/metadata.ts';

export type ServerMetadata = {
    cityId: string;
    scheduleMetadata: Metadata;
    lastEditDate: Temporal.ZonedDateTime;
    checksum: {
        patches: string;
        db: string;
    };
};
