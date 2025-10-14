import type { Metadata } from '../db/schema/metadata.ts';

export function getSimpleDate(date: Temporal.ZonedDateTime): string {
    return date.toPlainDate().toString();
}

// TODO Move
export function stringRepresentationOfMetadata(metadata: Metadata) {
    return `${metadata.validFrom}_${metadata.version}_${metadata.generation}`;
}
