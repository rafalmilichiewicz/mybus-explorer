import { DatabaseSchema, Row, ValuesToKeys } from '../../utils/types.ts';

export const METADATA_TABLE = {
    __table__: 'WERSJE',
    __columns__: {
        ID: 'id_wersja',
        VALID_FROM: 'wazna_od',
        GENERATION: 'generacja',
    },
} as const satisfies DatabaseSchema;

export const _metadataSql = {
    id_wersja: 4563,
    wazna_od: '2025-09-01',
    generacja: 1,
} satisfies Row<ValuesToKeys<typeof METADATA_TABLE.__columns__>>;

export type MetadataSql = typeof _metadataSql;

export type Metadata = {
    validFrom: string;
    version: number;
    generation: number;
};
