import { DatabaseSync } from 'node:sqlite';

import { ScheduleDatabase } from './lib/db/sql.ts';
import { Schedule } from './lib/db/schedule.ts';
import getVehicles from './lib/api/vehicles/vehicles.ts';
import { getVehicleFlags, getVehicleStatus } from './lib/db/schema/ztm-types.ts';
import { getTimetableForStop } from './lib/api/timetable/timetable-stop.ts';
import { delay } from '@std/async/delay';
import { CONFIG } from './lib/consts/config.ts';
import { getScheduleDatabase } from './lib/api/schedule/get-schedule.ts';
import { getTimetableForVehicle } from './lib/api/timetable/timetable-vehicle.ts';
import { getRouteTransitPoints } from './lib/api/route-points/route-points.ts';
import { generateSchemaJson } from './lib/db/patch/generate-schema.ts';
import { saveJson } from './lib/utils/files.ts';
import { hashObject, hashOfFile } from './lib/utils/hash.ts';
import { MyBusServer } from './server/server.ts';
import { ApiWrapper } from './lib/api/wrapper.ts';

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
    // await getTimetableForStop(2);
    // console.log(await getTimetableForStop(2));
    // console.log((await getTimetableForStop(355)));

    // console.log((await getTimetableForStop(364)));
    // console.log((await getTimetableForStop(365)));
    // console.log(vehicles);

    // console.log(await getTimetableForVehicle("30884"))
    // const routeTransitPoints = await getRouteTransitPoints('159', 'A');
    // const withStops = routeTransitPoints.map((el) => {
    //     if (el.type === 'stop') {
    //         const stopData = schedule.stops.find((stop) => stop.idSip === el.id);
    //         return {
    //             type: el.type,
    //             position: { longitude: stopData?.longitude!, latitude: stopData?.latitude! },
    //         };
    //     } else {
    //         return el;
    //     }
    // });
    // console.log(JSON.stringify(withStops, null));

    // console.log();

    // const testData = {
    //     foo: 'bar',
    //     baz: [1, 2, 3, 4, 5],
    // };

    // const filename = './testData.json';
    // await saveJson(filename, testData);
    // const objectHash = await hashObject(testData);
    // const fileHash = await hashOfFile(filename);

    // console.log(objectHash, fileHash);

    // if (objectHash === fileHash) {
    //     console.log('success');
    // } else {
    //     console.log('chujnia');
    // }

    // console.log(Temporal.Now.zonedDateTimeISO().toPlainDate())

    // generateSchemaJson()



    const server = MyBusServer.initialize(new ApiWrapper());

    // await Deno.writeTextFile("vehicles.json", JSON.stringify(vehicles))
    // console.log(vehicles);

    // Download database
    // Set version and gen
    // Save database under a name ???_{DATE}_{FROM}_{VERSION}_{GEN}.sqlite
    // Current database lives in ???.sqlite
    // If first run - download blind
    // If subsequent - compare and go to first step
}
