import { CONFIG } from './config.ts';

const BASE = CONFIG.API.BASE_URL;

export const ENDPOINTS = {
    PING_SERVICE: `${BASE}/PingService`,
    VEHICLES: `${BASE}/GetVehicles?cNbLst=&cTrackLst=&cDirLst=&cIdLst=&cKrsLst=&cRouteLst=`,
    ROUTE: `${BASE}/GetRouteVariantWithTransitPoints?`,
    
    TIME_TABLE: {
        STOP: `${BASE}/GetTimeTableReal?nBusStopId=`,
        VEHICLE: `${BASE}/GetVehicleTimeTable?&nNb=`,
    },
    SCHEDULE: {
        GET: `${BASE}/GetScheduleFile`,
        COMPARE: `${BASE}/CompareScheduleFile`,
    },
} as const;
