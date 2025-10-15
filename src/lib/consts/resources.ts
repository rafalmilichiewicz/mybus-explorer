import type { ScheduleMetadata } from '../db/schema/metadata.ts';
import { stringRepresentationOfMetadata } from '../utils/dates.ts';

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

export function generateStaticResourcePaths(cityId: string) {
    // ^ /resources/
    const resourcesFolder = RESOURCE_CONFIG.FOLDERS.RESOURCES;
    const metadataServerFile = `${resourcesFolder}/${RESOURCE_CONFIG.FILES.METADATA}`;
    const databaseRootFile = `${resourcesFolder}/${RESOURCE_CONFIG.FILES.DATABASE}`;
    const patchesSchemaFile = `${resourcesFolder}/${RESOURCE_CONFIG.FILES.PATCHES_SCHEMA}`;
    const patchesSchemaFileRelative = `../../../${RESOURCE_CONFIG.FILES.PATCHES_SCHEMA}`;

    // ^ /resources/city/
    const cityFolder = `${resourcesFolder}/${cityId}`;

    return {
        resourcesFolder,
        cityFolder,
        metadataServerFile,
        databaseRootFile,
        patchesSchemaFile,
        patchesSchemaFileRelative,
    } as const;
}
export type ResourcesStatic = ReturnType<typeof generateStaticResourcePaths>;

export function generateDynamicResourcePaths(
    staticResources: ResourcesStatic,
    metadata: ScheduleMetadata
) {
    const scheduleDate = stringRepresentationOfMetadata(metadata);
    // ^ /resources/city/<date>/
    const cityWithDateWithDate = `${staticResources.cityFolder}/${scheduleDate}`;

    // ^ /resources/city/<date>/data/
    const dataFolder = `${cityWithDateWithDate}/${RESOURCE_CONFIG.FOLDERS.DATA}`;
    const patchesFile = `${dataFolder}/${RESOURCE_CONFIG.FILES.PATCHES}`;
    const databaseFile = `${dataFolder}/${RESOURCE_CONFIG.FILES.DATABASE}`;

    // ^ /resources/city/<date>/observations/
    const observationsFolder = `${cityWithDateWithDate}/${RESOURCE_CONFIG.FOLDERS.OBSERVATIONS}`;
    const vehicleObservations = `${observationsFolder}/${RESOURCE_CONFIG.FILES.OBSERVATIONS_VEHICLE}`;

    return {
        cityWithDateWithDate,
        dataFolder,
        observationsFolder,
        patchesFile,
        databaseFile,
        vehicleObservations,
    };
}

export type ResourcesDynamic = ReturnType<typeof generateDynamicResourcePaths>;
