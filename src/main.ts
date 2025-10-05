import { exit } from 'node:process';
import { LUBLIN_AGE, TIME_ZONE } from './lib/consts/magic-numbers.ts';
import { getSchedule } from './lib/schedule/get-schedule.ts';
import { generateAgeHeader } from './lib/token/age.ts';
import { CITY_CODES } from './lib/token/cities.ts';
import generateCityOffset from './lib/token/city-offset.ts';
import generateHeaders from './lib/token/header.ts';
import generateToken from './lib/token/token.ts';
import getVehicles from './lib/vehicles/vehicles.ts';

// @ts-types="node:sqlite"
import { DatabaseSync } from 'node:sqlite';

// import { DB } from 'sqlite';

import { compareSchedule } from './lib/schedule/compare-schedule.ts';
import { parseStopDescription, Schedule } from './lib/schedule/schedule.ts';
import { splitDeparturesString, toDepartureTime } from './lib/db/schema/departure.ts';

if (import.meta.main) {
    console.log('Starting ZDiTM Thing...');

    // console.log(await generateToken(LUBLIN_AGE));
    // console.log(await generateHeaders(LUBLIN_AGE));

    // Deno.writeTextFile("test.json", JSON.stringify((await getVehicles())));

    // ^ Schedule file
    const filename = './schedule.sql';
    // const schedule = await getSchedule('./schedule.sql');

    // if (!schedule) {
    //     console.error('DB Not loaded');
    //     exit();
    // }

    const db = new DatabaseSync(filename, { readOnly: true, open: true });

    const schedule = new Schedule(filename);

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
    // schedule.saveSchedule();

    // console.log(toDepartureTime("18120"));

    const test =
        '18120,,19920,,21540,,22440,,23340,,24180,,25080,,25980,,26880,,27780,,28680,,29580,,30720,,32520,,34320,,36120,,37920,,39720,,41520,,43320,,45120,,46920,,48720,,49620,,50520,,51420,,52320,,53220,,54120,,55020,,55920,,56820,,57720,,58800,,60780,,62580,,64380,,66180,,67980,,69780,,71640,,73440,,75300,,77100,,78900,,80700,';

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
