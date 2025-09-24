import { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from './schema.ts';
import { Stop } from './schema/stop.ts';

const stopId = SCHEMA.STOPS.__columns__.ID_SIP;
const stops = 'stops';

type z = ({ id: Stop['idSip'] } & { destinations: string })[];
export function getStopsDestinations(db: DatabaseSync) {
    const sql = `SELECT stop.${stopId},
    JSON_GROUP_ARRAY(DISTINCT TRIM(dest.${SCHEMA.DESTINATIONS.__columns__.DESTINATION})) AS destinations
    FROM ${SCHEMA.STOPS.__table__} stop
    INNER JOIN ${SCHEMA.DESTINATIONS.__table__} dest
    ON ',' || dest.${SCHEMA.DESTINATIONS.__columns__.ROUTE} || ',' LIKE '%,' || stop.${stopId} || ',%'
    GROUP BY stop.${stopId}
    ORDER BY stop.${stopId}`;

    const result = db.prepare(sql).all();
    const res = result.map((el) => {
        return { id: el.id, dest: (JSON.parse(el.destinations as string) as string[]).map(el => el.trim().replaceAll("  ", " ")) };
    });
    console.log(res);

    return res;
}
