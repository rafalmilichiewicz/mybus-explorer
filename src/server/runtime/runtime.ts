import { DatabaseSync } from 'node:sqlite';
import { CONFIG } from '../../lib/consts/config.ts';
import {
    generateDynamicResourcePaths,
    generateStaticResourcePaths,
    type ResourcesDynamic,
} from '../../lib/consts/resources.ts';
import { ScheduleDatabase } from '../../lib/db/sql.ts';
import { copyFile, createFolder, readJson, saveJson } from '../../lib/utils/files.ts';
import type { ServerMetadata } from './metadata.ts';
import type { ApiWrapper } from '../../lib/api/wrapper.ts';
import { Schedule } from '../../lib/db/schedule.ts';
import { type DatabasePatches, EMPTY_PATCHES } from '../../lib/db/patch/patch.ts';
import { hashObject, hashOfFile } from '../../lib/utils/hash.ts';
import { throwError } from '../../lib/utils/types.ts';
import { generateSchemaJson } from '../../lib/db/patch/generate-schema.ts';
import type { ScheduleMetadata as ScheduleMetadata } from '../../lib/db/schema/metadata.ts';

export class AppRuntime {
    private readonly api: ApiWrapper;
    private readonly schedule: Schedule;
    private static readonly cityId = CONFIG.CITY.ID;
    private static readonly resourcesStatic = generateStaticResourcePaths(this.cityId);
    private resourcesDynamic: ResourcesDynamic;

    private constructor(schedule: Schedule, api: ApiWrapper, resourcesDynamic: ResourcesDynamic) {
        this.api = api;
        this.schedule = schedule;
        this.resourcesDynamic = resourcesDynamic;
    }

    // : Promise<typeof MyBusServer>
    static async initialize(api: ApiWrapper) {
        let resourcesDynamic: ResourcesDynamic;
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

        // TODO Validate patches
        let patches = await readJson<DatabasePatches>(resourcesDynamic.patchesFile);
        if (patches === null) {
            patches = EMPTY_PATCHES;
            patches.$schema = this.resourcesStatic.patchesSchemaFile;
            await saveJson(resourcesDynamic.patchesFile, patches, true, true);
            await this.updateAppMetadata(metadata.scheduleMetadata);
        }

        if (patches !== null && (await hashObject(patches)) !== metadata.checksum.patches) {
            console.log('Patches path');
            this.applyPatches(patches);
            this.updateAppMetadata(metadata.scheduleMetadata, patches);
            // Apply patches + Update metadata
        }

        // ^ Check if new version of schedule is available
        const scheduleComparison = await api.schedule.checkIfChanged(
            metadata.scheduleMetadata.version,
            metadata.scheduleMetadata.generation
        );
        if (scheduleComparison) {
            ({ metadata, resourcesDynamic } = await AppRuntime.initializeResources(api));
            await this.updateAppMetadata(metadata.scheduleMetadata, patches);
        }

        // return new MyBusServer();
    }

    private static async initializeResources(api: ApiWrapper) {
        const savingResult = await api.schedule.save(this.resourcesStatic.databaseRootFile);
        if (!savingResult) throw new Error('Error while saving schedule database');
        const databaseHandle = new DatabaseSync(this.resourcesStatic.databaseRootFile);
        const scheduleDatabase = new ScheduleDatabase(databaseHandle, EMPTY_PATCHES);

        const schedule: Schedule = new Schedule(scheduleDatabase);
        const scheduleMetadata = schedule.metadata;

        const metadata = await AppRuntime.updateAppMetadata(scheduleMetadata);

        const resourcesDynamic = generateDynamicResourcePaths(
            this.resourcesStatic,
            scheduleMetadata
        );
        const patchesDefault = EMPTY_PATCHES;
        patchesDefault.$schema = this.resourcesStatic.patchesSchemaFileRelative;

        await createFolder(resourcesDynamic.cityWithDateWithDate);
        await createFolder(resourcesDynamic.dataFolder);
        await createFolder(resourcesDynamic.observationsFolder);
        await saveJson(this.resourcesStatic.metadataServerFile, metadata, true);
        await saveJson(resourcesDynamic.patchesFile, patchesDefault, true, true);
        await saveJson(this.resourcesStatic.patchesSchemaFile, generateSchemaJson(), true);
        await copyFile(this.resourcesStatic.databaseRootFile, resourcesDynamic.databaseFile);
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

    private static async applyPatches(patches: DatabasePatches) {
        console.log('HEY', patches);

        // logic for applying and saving patch
    }
}
