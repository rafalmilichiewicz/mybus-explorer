//@ts-types="node:sqlite"
import { DatabaseSync } from 'node:sqlite';

import { ScheduleDatabase } from './lib/db/sql.ts';
import { Schedule } from './lib/schedule/schedule.ts';

if (import.meta.main) {
    console.log('Starting ZDiTM Thing...');

    // console.log(await generateToken(LUBLIN_AGE));
    // console.log(await generateHeaders(LUBLIN_AGE));

    // Deno.writeTextFile("test.json", JSON.stringify((await getVehicles())));

    // ^ Schedule file
    const filename = './schedule_2025_10-05.sql';
    // const filename = './schedule_2025_10-05.sql';
    // const schedule = await getSchedule(filename);

    // if (!schedule) {
    //     console.error('DB Not loaded');
    //     exit();
    // }

    // const db = new DatabaseSync(filename, { readOnly: true, open: true });

    const schedule = new Schedule(
        new ScheduleDatabase(new DatabaseSync(filename, { readOnly: true, open: true }))
    );

    // console.log(schedule);

    // console.log(parseStopDescription({
    //     id: 103,
    //     id_ul: 31,
    //     nazwa: 'SAPIEHY 02',
    //     numer: 1832,
    //     slupek: null,
    //     odjazdy: 1,
    //     lon: 22.57234,
    //     lat: 51.26038,
    //     transport: 'A',
    //     linieA: '17,24,31',
    //     linieT: '',
    //     linieR: '',
    //     sort: 1031,
    //     kierunek: 'JABŁONNA  URZĄD GMINY, OS.PORĘBA',
    //     typ_tab: 0,
    // }));
    // console.log(schedule.getLines())

    // console.log(metaSql);
    // schedule.getStops();

    // Deno.writeTextFile("./stops.json", JSON.stringify(schedule.generateStops()))
    // Deno.writeTextFile("./routes.json", JSON.stringify(schedule.generateRoutes()))
    // // Deno.writeTextFile("./points.json", JSON.stringify(schedule.generateSalesPoints()))

    // !
    schedule.saveSchedule();

    // console.log(schedule.generateConfig());

    // console.log(splitDeparturesString(test).map(timeString => toDepartureTime(timeString)));

    // type ScheduleMetadata = {
    //     validFrom: string;
    //     version: number;
    //     generation: number;
    // };

    // console.log(meta);
    // const saveDate = Temporal.Now.plainDateISO(TIME_ZONE);
    // const newDatabase = `schedule_${saveDate}_${meta.validFrom}_${meta.version}_${meta.generation}.sqlite`;
    // console.log(newDatabase);

    // await Deno.copyFile(filename, `./${newDatabase}`);

    // console.log(compareSchedule(4563, 1));
    // Download database
    // Set version and gen
    // Save database under a name ???_{DATE}_{FROM}_{VERSION}_{GEN}.sqlite
    // Current database lives in ???.sqlite
    // If first run - download blind
    // If subsequent - compare and go to first step
}
