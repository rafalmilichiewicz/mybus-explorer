import { DatabaseSync } from 'node:sqlite';
import { CONFIG } from '../lib/consts/config.ts';
import {
    generateDynamicResourcePaths,
    generateStaticResourcePaths,
    type ResourcesDynamic,
} from '../lib/consts/resources.ts';
import { ScheduleDatabase } from '../lib/db/sql.ts';
import { copyFile, createFolder, readJson, saveJson } from '../lib/utils/files.ts';
import type { ServerMetadata } from './metadata.ts';
import type { ApiWrapper } from '../lib/api/wrapper.ts';
import { Schedule } from '../lib/db/schedule.ts';
import { type DatabasePatches, EMPTY_PATCHES } from '../lib/db/patch/patch.ts';
import { hashObject, hashOfFile } from '../lib/utils/hash.ts';
import { throwError } from '../lib/utils/types.ts';

export class MyBusServer {
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
            const savingResult = await api.schedule.save(this.resourcesStatic.databaseRootFile);
            if (!savingResult) throw new Error('Error while saving schedule database');
            const databaseHandle = new DatabaseSync(this.resourcesStatic.databaseRootFile);
            const scheduleDatabase = new ScheduleDatabase(databaseHandle, EMPTY_PATCHES);

            const schedule: Schedule = new Schedule(scheduleDatabase);
            const scheduleMetadata = schedule.metadata;

            const patchesDefault = EMPTY_PATCHES;
            patchesDefault.$schema = this.resourcesStatic.patchesSchemaFile;

            metadata = {
                lastEditDate: Temporal.Now.zonedDateTimeISO(CONFIG.CONFIG.TIME_ZONE),
                cityId: this.cityId, // TODO Check if cityId is different
                scheduleMetadata: scheduleMetadata,
                checksum: {
                    patches: await hashObject(patchesDefault),
                    db:
                        (await hashOfFile(this.resourcesStatic.databaseRootFile)) ??
                        throwError('Database changed'),
                },
            };

            resourcesDynamic = generateDynamicResourcePaths(this.resourcesStatic, scheduleMetadata);

            await createFolder(resourcesDynamic.cityWithDateWithDate);
            await createFolder(resourcesDynamic.dataFolder);
            await createFolder(resourcesDynamic.observationsFolder);
            await saveJson(this.resourcesStatic.metadataServerFile, metadata);
            await saveJson(resourcesDynamic.patchesFile, patchesDefault);
            await copyFile(this.resourcesStatic.databaseRootFile, resourcesDynamic.databaseFile);
        }

        // ^ Metadata present but something changed
        if (this.cityId !== metadata.cityId) {
            // Prev path
        }

        resourcesDynamic = generateDynamicResourcePaths(
            this.resourcesStatic,
            metadata.scheduleMetadata
        );

        const patches = await readJson<DatabasePatches>(resourcesDynamic.patchesFile);
        // Validate patches

        if ((await hashObject(patches)) !== metadata.checksum.patches) {
            // Apply patches + Update metadata
        }

        // ^ Check if new version of schedule is available

        const scheduleComparison = await api.schedule.compare(
            metadata.scheduleMetadata.version,
            metadata.scheduleMetadata.generation
        );
        if (scheduleComparison) {
            // Download new database
        }

        // TODO Schema update file
        // return new MyBusServer();
    }
}
