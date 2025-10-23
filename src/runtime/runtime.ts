import { DatabaseSync } from 'node:sqlite';
import type { RouteTransitPoints } from '../lib/api/route-points/point.ts';
import type { ApiWrapper } from '../lib/api/wrapper.ts';
import { CONFIG } from '../lib/consts/config.ts';
import {
    generateStaticResourcePaths,
    type ResourcesDynamic,
    generateDynamicResourcePaths,
} from '../lib/consts/resources.ts';
import { generateSchemaJson } from '../lib/db/patch/generate-schema.ts';
import { type DatabasePatches, EMPTY_PATCHES } from '../lib/db/patch/patch.ts';
import { Schedule } from '../lib/db/schedule.ts';
import type { ScheduleMetadata } from '../lib/db/schema/metadata.ts';
import { ScheduleDatabase } from '../lib/db/sql.ts';
import { copyFile, createFolder, readJson, saveJson } from '../lib/utils/files.ts';
import { hashObject, hashOfFile } from '../lib/utils/hash.ts';
import { throwError } from '../lib/utils/types.ts';
import type { ServerMetadata } from './metadata.ts';
import { convertScrapingToJson, scrapeVehiclesOnlineToNdjson } from './scrape.ts';

export class AppRuntime {
    private readonly api: ApiWrapper;
    public readonly schedule: Schedule;
    public readonly metadata: ServerMetadata;
    private static readonly cityId = CONFIG.CITY.ID;
    private static readonly resourcesStatic = generateStaticResourcePaths(this.cityId);
    private readonly resourcesDynamic: ResourcesDynamic;

    private constructor(
        schedule: Schedule,
        api: ApiWrapper,
        metadata: ServerMetadata,
        resourcesDynamic: ResourcesDynamic
    ) {
        this.api = api;
        this.schedule = schedule;
        this.metadata = metadata;
        this.resourcesDynamic = resourcesDynamic;
    }

    public async scrapeVehiclesOnlineToNdjson() {
        await scrapeVehiclesOnlineToNdjson(this.resourcesDynamic.vehicleObservations, this.api);
    }

    public async convertScrapingToJson() {
        return await convertScrapingToJson(this.resourcesDynamic.vehicleObservations);
    }

    /**
     * Initializes the runtime — prepares folders, loads or regenerates metadata,
     * applies patches, and ensures the schedule is current.
     */
    static async initialize(api: ApiWrapper) {
        let resourcesDynamic: ResourcesDynamic;
        let schedule: Schedule;
        await createFolder(this.resourcesStatic.resourcesFolder);
        await createFolder(this.resourcesStatic.cityFolder);

        let metadata = await readJson<ServerMetadata>(this.resourcesStatic.metadataServerFile);
        // ^ No metadata
        if (!metadata) {
            ({ metadata, resourcesDynamic } = await AppRuntime.initializeResources(api));
        }

        // ^ Metadata present but something changed
        if (this.cityId !== metadata.cityId) {
            ({ metadata, resourcesDynamic } = await AppRuntime.initializeResources(api));
        }

        resourcesDynamic = generateDynamicResourcePaths(
            this.resourcesStatic,
            metadata.scheduleMetadata
        );

        schedule = await Schedule.fromFiles(resourcesDynamic.generatedFolder);

        // ^ Patches
        // TODO Validate patches
        let patches = await readJson<DatabasePatches>(resourcesDynamic.patchesFile);
        if (patches === null) {
            patches = EMPTY_PATCHES;
            patches.$schema = this.resourcesStatic.patchesSchemaFile;
            await saveJson(resourcesDynamic.patchesFile, patches, true, true);
            await this.updateAppMetadata(metadata.scheduleMetadata);
        }

        if (patches !== null && (await hashObject(patches)) !== metadata.checksum.patches) {
            console.log('Applying patches...');
            this.applyPatches(resourcesDynamic, patches);
            this.updateAppMetadata(metadata.scheduleMetadata, patches);
        }

        // ^ Check if new version of schedule is available
        const scheduleComparison = await api.schedule.checkIfChanged(
            metadata.scheduleMetadata.version,
            metadata.scheduleMetadata.generation
        );
        if (scheduleComparison) {
            ({ metadata, resourcesDynamic } = await AppRuntime.initializeResources(api));
            metadata = await this.updateAppMetadata(metadata.scheduleMetadata, patches);
            schedule = await Schedule.fromFiles(resourcesDynamic.generatedFolder);
        }

        return new AppRuntime(schedule, api, metadata, resourcesDynamic);
    }

    private static async initializeResources(api: ApiWrapper) {
        const savingResult = await api.schedule.saveToFile(this.resourcesStatic.databaseRootFile);
        const patchesDefault = EMPTY_PATCHES;
        patchesDefault.$schema = this.resourcesStatic.patchesSchemaFileRelative;
        if (!savingResult) throw new Error('Error while saving schedule database');
        const databaseHandle = new DatabaseSync(this.resourcesStatic.databaseRootFile);
        const scheduleDatabase = new ScheduleDatabase(databaseHandle, patchesDefault);

        const schedule: Schedule = await Schedule.fromDatabase(scheduleDatabase);
        const scheduleMetadata = schedule.metadata;

        const metadata = await AppRuntime.updateAppMetadata(scheduleMetadata);

        const resourcesDynamic = generateDynamicResourcePaths(
            this.resourcesStatic,
            scheduleMetadata
        );

        await createFolder(resourcesDynamic.cityWithDateWithDate);
        await createFolder(resourcesDynamic.dataFolder);
        await createFolder(resourcesDynamic.observationsFolder);
        await createFolder(resourcesDynamic.generatedFolder);
        await saveJson(this.resourcesStatic.metadataServerFile, metadata, true);
        await saveJson(resourcesDynamic.patchesFile, patchesDefault, true, true);
        await saveJson(this.resourcesStatic.patchesSchemaFile, generateSchemaJson(), true);
        await copyFile(this.resourcesStatic.databaseRootFile, resourcesDynamic.databaseFile);

        const transitPointsForRoutes: RouteTransitPoints[] = [];
        const routeLength = schedule.routes.length;
        for (const [index, route] of schedule.routes.entries()) {
            console.log(`Downloading route ${route.routeKey} ${index + 1}/${routeLength}`);
            transitPointsForRoutes.push(
                await api.getTransitPointsForRoute(route.number, route.variant)
            );
        }
        schedule.setRouteTransitPoints(transitPointsForRoutes);

        await schedule.saveToFiles(resourcesDynamic.generatedFolder);

        return { metadata, resourcesDynamic };
    }

    private static async updateAppMetadata(
        scheduleMetadata: ScheduleMetadata,
        patches?: DatabasePatches
    ) {
        const patchesDefault = EMPTY_PATCHES;
        patchesDefault.$schema = this.resourcesStatic.patchesSchemaFileRelative;
        const metadata = {
            lastEditDate: Temporal.Now.zonedDateTimeISO(CONFIG.CONFIG.TIME_ZONE),
            cityId: this.cityId,
            scheduleMetadata: scheduleMetadata,
            checksum: {
                patches: await hashObject(patches ?? patchesDefault),
                db:
                    (await hashOfFile(this.resourcesStatic.databaseRootFile)) ??
                    throwError('Database changed'),
            },
        };
        await saveJson(this.resourcesStatic.metadataServerFile, metadata, true);
        return metadata;
    }

    private static async applyPatches(
        resourcesDynamic: ResourcesDynamic,
        patches: DatabasePatches
    ): Promise<Schedule> {
        const databaseSync = new DatabaseSync(resourcesDynamic.databaseFile, {
            readOnly: true,
            open: true,
        });
        const scheduleDatabase = new ScheduleDatabase(databaseSync, patches);
        const schedule = Schedule.fromDatabase(scheduleDatabase);
        await schedule.saveToFiles(resourcesDynamic.generatedFolder);
        return schedule;
    }
}
