import { CONFIG } from './config.ts';

const BASE = CONFIG.API.BASE_URL;

export const ENDPOINTS = {
    PING_SERVICE: `${BASE}/PingService`,
    VEHICLES: `${BASE}/GetVehicles?cNbLst=&cTrackLst=&cDirLst=&cIdLst=&cKrsLst=&cRouteLst=`,
    TIME_TABLE: `${BASE}/`, // TODO
    SCHEDULE: {
        GET: `${BASE}/GetScheduleFile`,
        COMPARE: `${BASE}/CompareScheduleFile`,
    },
} as const;
