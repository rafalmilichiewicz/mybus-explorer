import type { ScheduleMetadata } from '../db/schema/metadata.ts';
import { stringRepresentationOfMetadata } from '../utils/dates.ts';

export const RESOURCE_CONFIG = {
    FOLDERS: {
        RESOURCES: './resources',
        DATA: 'data',
        OBSERVATIONS: 'observations',
        GENERATED: 'generated',
    },
    FILES: {
        METADATA: 'metadata.json',
        DATABASE: 'schedule.sqlite',
        PATCHES_SCHEMA: 'schema.json',
        PATCHES: 'patches.json',
        OBSERVATIONS_VEHICLE: 'vehicles.ndjson',
    },
    SCHEDULE: {
        CALENDAR: 'calendar.json',
        CONFIG: 'config.json',
        DEPARTURES: 'departures.json',
        METADATA: 'metadata.json',
        NOTICES: 'notices.json',
        POINTS_OF_SALE: 'points_of_sale.json',
        ROUTES: 'routes.json',
        STOPS: 'stops.json',
        STREETS: 'streets.json',
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

    // ^ /resources/city/<date>/generated/
    const generatedFolder = `${cityWithDateWithDate}/${RESOURCE_CONFIG.FOLDERS.GENERATED}`;

    return {
        cityWithDateWithDate,
        dataFolder,
        observationsFolder,
        patchesFile,
        databaseFile,
        vehicleObservations,
        generatedFolder,
    };
}

export type ResourcesDynamic = ReturnType<typeof generateDynamicResourcePaths>;

export function generateScheduleResources(basePath: string) {
    const calendarFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.CALENDAR}`;
    const configFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.CONFIG}`;
    const departuresFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.DEPARTURES}`;
    const metadataFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.METADATA}`;
    const noticesFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.NOTICES}`;
    const pointsOfSaleFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.POINTS_OF_SALE}`;
    const routesFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.ROUTES}`;
    const stopsFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.STOPS}`;
    const streetsFile = `${basePath}/${RESOURCE_CONFIG.SCHEDULE.STREETS}`;

    return {
        calendarFile,
        configFile,
        departuresFile,
        metadataFile,
        noticesFile,
        pointsOfSaleFile,
        routesFile,
        stopsFile,
        streetsFile,
    };
}

export type ScheduleResources = ReturnType<typeof generateScheduleResources>;
