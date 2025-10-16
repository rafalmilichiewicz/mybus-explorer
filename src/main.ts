import { DatabaseSync } from 'node:sqlite';

import { ScheduleDatabase } from './lib/db/sql.ts';
import { Schedule } from './lib/db/schedule.ts';
import type getVehicles from './lib/api/vehicles/vehicles.ts';
import type { getVehicleFlags, getVehicleStatus } from './lib/db/schema/ztm-types.ts';
import type { getTimetableForStop } from './lib/api/timetable/timetable-stop.ts';
import type { delay } from '@std/async/delay';
import type { CONFIG } from './lib/consts/config.ts';
import type { getScheduleDatabase } from './lib/api/schedule/get-schedule.ts';
import type { getTimetableForVehicle } from './lib/api/timetable/timetable-vehicle.ts';
import type { getRouteTransitPoints } from './lib/api/route-points/route-points.ts';
import type { generateSchemaJson } from './lib/db/patch/generate-schema.ts';
import type { saveJson } from './lib/utils/files.ts';
import type { hashObject, hashOfFile } from './lib/utils/hash.ts';
import { AppRuntime } from './server/runtime/runtime.ts';
import { ApiWrapper } from './lib/api/wrapper.ts';
import { EMPTY_PATCHES } from './lib/db/patch/patch.ts';
import { RouteTransitPoints } from './lib/api/route-points/point.ts';

if (import.meta.main) {
    console.log('Starting ZDiTM Thing...');

    // ^ Schedule file
    // const filename = './schedule_CH_2025_10-05.sql';
    // const schedule = await getSchedule(filename);

    // if (!schedule) {
    //     console.error('DB Not loaded');
    //     exit();
    // }

    // const filename = './resources/lublin/2025-10-01_4565_1/data/schedule.sqlite';

    // const schedule = Schedule.fromDatabase(
    //     new ScheduleDatabase(
    //         new DatabaseSync(filename, { readOnly: true, open: true }),
    //         EMPTY_PATCHES
    //     )
    // );

    // const api = new ApiWrapper();

    // const transitPointsForRoutes: RouteTransitPoints[] = [];
    // for (const route of schedule.routes) {
    //     transitPointsForRoutes.push(
    //         await api.getTransitPointsForRoute(route.number, route.variant)
    //     );
    // }

    // await api.getTransitPointsForRoute('17', 'B');
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

    // const server = AppRuntime.initialize(new ApiWrapper());

    // await Deno.writeTextFile("vehicles.json", JSON.stringify(vehicles))
    // console.log(vehicles);

    // Download database
    // Set version and gen
    // Save database under a name ???_{DATE}_{FROM}_{VERSION}_{GEN}.sqlite
    // Current database lives in ???.sqlite
    // If first run - download blind
    // If subsequent - compare and go to first step
}
