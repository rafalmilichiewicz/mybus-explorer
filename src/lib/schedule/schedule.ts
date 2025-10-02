// @ts-types="node:sqlite"
import { DatabaseSync } from 'node:sqlite';
import { SCHEMA } from '../db/schema.ts';
import { Metadata, MetadataSql } from '../db/schema/metadata.ts';
import { Destination, DestinationSql } from '../db/schema/destination.ts';
import { StopSql, Stop } from '../db/schema/stop.ts';
import { StreetSql } from '../db/schema/street.ts';
import { getStopsDestinations } from '../db/sql.ts';
type PickAsObject<T, K extends keyof T> = { [P in K]: T[P] };

function naturalSort(a: string, b: string) {
    const aNum = Number(a);
    const bNum = Number(b);

    const aIsNum = !isNaN(aNum);
    const bIsNum = !isNaN(bNum);

    if (aIsNum && bIsNum) {
        return aNum - bNum; // normal numeric sort
    }

    if (aIsNum) return -1; // numbers come first
    if (bIsNum) return 1;

    return a.localeCompare(b, 'pl', { numeric: true });
}

type PrefixedColumns<T extends Record<string, unknown>, Prefix extends string> = {
    [K in keyof T as `${Lowercase<Prefix>}_${Extract<K, string>}`]: T[K];
};

type PrefixedStreet = PrefixedColumns<StreetSql, 'street'>;
type PrefixedStop = PrefixedColumns<StopSql, 'stop'>;
function prefixedSelect<T extends Record<string, string>, Prefix extends string>(
    columns: T,
    prefix: Prefix
) {
    return Object.entries(columns).map(
        ([alias, col]) => `${prefix}.${col} AS ${prefix}_${columns[alias]}`
    );
}

export class Schedule {
    private db: DatabaseSync;
    public metadata: Metadata;

    constructor(filename: string) {
        this.db = new DatabaseSync(filename, { readOnly: true, open: true });
        this.metadata = this.getMetadata();
    }

    private getMetadata(): Metadata {
        const metaSql = this.db
            .prepare(`SELECT * FROM ${SCHEMA.METADATA.__table__}`)
            .get() as MetadataSql;

        return {
            validFrom: metaSql.wazna_od,
            version: metaSql.id_wersja,
            generation: metaSql.generacja,
        };
    }

    public getLines() {
        const linesSql = this.db
            .prepare(
                // `SELECT DISTINCT dest.${SCHEMA.DESTINATIONS.__columns__.DESTINATION}, dest.${SCHEMA.DESTINATIONS.__columns__.LINE_NUMBER}, dest.${SCHEMA.DESTINATIONS.__columns__.ROUTE_VARIANT}
                `SELECT *
                FROM ${SCHEMA.DESTINATIONS.__table__} dest 
                INNER JOIN ${SCHEMA.DEPARTURES.__table__} dep 
                ON dest.${SCHEMA.DESTINATIONS.__columns__.ID} = dep.${SCHEMA.DEPARTURES.__columns__.DESTINATION_ID}`
            )

            .all();
        console.log(linesSql);
        // console.log(linesSql.map((el) => el.numer.trim()).sort(naturalSort));
    }

    getStops() {
        // TODO Do this clever with .join()
        // str.${SCHEMA.STREETS.__columns__.ID}, str.${SCHEMA.STREETS.__columns__.ID}
        const prefixedStops = prefixedSelect(SCHEMA.STOPS.__columns__, 'stop');
        const prefixedStreet = prefixedSelect(SCHEMA.STREETS.__columns__, 'street');
        const sql = `
            SELECT DISTINCT ${[...prefixedStops, prefixedStreet].join(',\n')} 
            FROM ${SCHEMA.STOPS.__table__} stop
            INNER JOIN ${SCHEMA.STREETS.__table__} street 
            ON street.${SCHEMA.STREETS.__columns__.ID} = stop.${SCHEMA.STOPS.__columns__.STREET_ID}
            INNER JOIN ${SCHEMA.DESTINATIONS.__table__} dest
            ON  ',' || dest.${SCHEMA.DESTINATIONS.__columns__.ROUTE} || ',' LIKE '%,' || stop.${
            SCHEMA.STOPS.__columns__.ID_SIP
        } || ',%'
        `;

        console.log(sql);

        const stopsSqlRaw = this.db.prepare(sql);

        //     .prepare(`SELECT DISTINCT st.id as sip, st.nazwa as nazwa_przy, srt.${SCHEMA.STREETS.__columns__.ID}, srt.${SCHEMA.STREETS.__columns__.ID},
        //         st.${SCHEMA.STOPS.__columns__.DEPARTURES}, st.${SCHEMA.STOPS.__columns__.DESTINATIONS}
        // FROM ${SCHEMA.STOPS.__table__} st
        // INNER JOIN ${SCHEMA.STREETS.__table__} srt ON ${SCHEMA.STOPS.__columns__.STREET_ID} = srt.${SCHEMA.STREETS.__columns__.ID}
        // INNER JOIN ${SCHEMA.DEPARTURES.__table__} dep ON dep.${SCHEMA.DEPARTURES.__columns__.STOP_ID} = st.${SCHEMA.STOPS.__columns__.ID_SIP}
        // `);
        console.log(stopsSqlRaw.expandedSQL);
        const stopsSql = stopsSqlRaw.all() as (PrefixedStop & PrefixedStreet)[];
        // console.log(stopsSql);

        const patched = getStopsDestinations(this.db);

        const stops = stopsSql.map((el) => {
            const [groupName, groupNumber] = parseStopDescription(el.stop_id, el.stop_nazwa.trim());
            const sip = el.stop_id;
            return {
                idSip: sip,
                idZtm: el.stop_numer,
                streetId: el.stop_id_ul,
                streetName: el.street_nazwa,
                order: el.stop_sort,
                description: el.stop_nazwa.trim(),
                groupName,
                groupNumber,
                longitude: el.stop_lon,
                latitude: el.stop_lat,
                linesBus: el.stop_linieA.split(','),
                linesTram: el.stop_linieT.split(','),
                linesTrolleybus: el.stop_linieR.split(','),
                destinations: patched.find(p => p.id === sip)?.dest ?? [],
                // destinations: el.stop_kierunek.split(',').map((el) => el.trim()),
                transportMode: el.stop_transport,
            } satisfies Stop;
        });
        console.log(stops);
        return stops;
    }

    // private get
}

export function parseStopDestinations(idSip: number, db: DatabaseSync) {
    console.log(idSip);
}

export function parseStopDescription(idSip: number, description: string) {
    // TODO Add patches system
    // console.log(stop);

    const match = description.match(/^(.*?)(\d+)\s*$/);

    if (!match) {
        throw new Error(idSip + description);
    }

    const groupName = match[1].trim();
    const groupNumber = match[2];
    return [groupName, groupNumber] as const;
}

// TODO Get destinations of each stop
