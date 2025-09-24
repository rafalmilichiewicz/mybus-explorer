const BASE = 'http://sip.ztm.lublin.eu/AndroidService/SchedulesService.svc';

export const ENDPOINTS = {
    PING_SERVICE: `${BASE}/PingService`,
    VEHICLES: `${BASE}/GetVehicles?cNbLst=&cTrackLst=&cDirLst=&cIdLst=&cKrsLst=&cRouteLst=`,
    TIME_TABLE: `${BASE}/`, // TODO
    SCHEDULE: {
        GET: `${BASE}/GetScheduleFile`,
        COMPARE: `${BASE}/CompareScheduleFile`,
    },
} as const;
