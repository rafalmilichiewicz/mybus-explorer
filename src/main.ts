import { DatabaseSync } from 'node:sqlite';

import { ScheduleDatabase } from './lib/db/sql.ts';
import { Schedule } from './lib/db/schedule.ts';
import getVehicles from './lib/api/vehicles/vehicles.ts';
import { getVehicleFlags, getVehicleStatus } from './lib/db/schema/ztm-types.ts';
import { getTimetableForStop } from './lib/api/timetable/timetable-stop.ts';
import { delay } from '@std/async/delay';
import { CONFIG } from './lib/consts/config.ts';
import { getSchedule } from './lib/api/schedule/get-schedule.ts';

if (import.meta.main) {
    console.log('Starting ZDiTM Thing...');

    // ^ Schedule file
    // const filename = './schedule_CH_2025_10-05.sql';
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
    // // const vehicles = await getVehicles("40");
    ;
    // await getTimetableForStop(2);
    console.log(await getTimetableForStop(2));
    // console.log((await getTimetableForStop(355)));

    // console.log((await getTimetableForStop(364)));
    // console.log((await getTimetableForStop(365)));
    // console.log(vehicles);

    // await Deno.writeTextFile("vehicles.json", JSON.stringify(vehicles))
    // console.log(vehicles);

    // Download database
    // Set version and gen
    // Save database under a name ???_{DATE}_{FROM}_{VERSION}_{GEN}.sqlite
    // Current database lives in ???.sqlite
    // If first run - download blind
    // If subsequent - compare and go to first step
}
