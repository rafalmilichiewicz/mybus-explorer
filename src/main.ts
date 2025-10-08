//@ts-types="node:sqlite"
import type { DatabaseSync } from 'node:sqlite';

import type { ScheduleDatabase } from './lib/db/sql.ts';
import type { Schedule } from './lib/schedule/schedule.ts';
import getVehicles from './lib/api/vehicles/vehicles.ts';

if (import.meta.main) {
    console.log('Starting ZDiTM Thing...');

    // ^ Schedule file
    // const filename = './schedule_2025_10-05.sql';
    // const schedule = await getSchedule(filename);

    // if (!schedule) {
    //     console.error('DB Not loaded');
    //     exit();
    // }

    // const filename = './schedule_2025_10-05.sql';
    // const db = new DatabaseSync(filename, { readOnly: true, open: true });

    // const schedule = new Schedule(
    //     new ScheduleDatabase(new DatabaseSync(filename, { readOnly: true, open: true }))
    // );
    const vehicles = await getVehicles();

    await Deno.writeTextFile("vehicles.json", JSON.stringify(vehicles))
    console.log(vehicles);

    // Download database
    // Set version and gen
    // Save database under a name ???_{DATE}_{FROM}_{VERSION}_{GEN}.sqlite
    // Current database lives in ???.sqlite
    // If first run - download blind
    // If subsequent - compare and go to first step
}
