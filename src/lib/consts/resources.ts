export const RESOURCE_CONFIG = {
    FOLDERS: {
        RESOURCES: './resources',
        DATA: 'data',
        OBSERVATIONS: 'observations',
    },
    FILES: {
        METADATA: 'metadata.json',
        DATABASE: 'schedule.sqlite',
        PATCHES_SCHEMA: 'schema.json',
        PATCHES: 'patches.json',
        OBSERVATIONS_VEHICLE: 'vehicles.ndjson',
    },
} as const;
