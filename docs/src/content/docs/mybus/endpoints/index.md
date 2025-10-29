---
title: Endpoints
sidebar:
    order: 1
---

There are 7 main endpoints used in the mobile app:

1.  [Ping service](./ping) - `${BASE}/PingService`
2.  [Compare schedule version](./schedule-compare) - `${BASE}/CompareScheduleFile`
3.  [Download schedule ](./schedule-download) - `${BASE}/GetScheduleFile`
4.  [Timetable for stop](./timetable-stop) - `${BASE}/GetTimeTableReal`,
5.  [Timetable for vehicle](./timetable-vehicle) - `${BASE}/GetVehicleTimeTable`,
6.  [Route transit points](./transit-points) - `${BASE}/GetRouteVariantWithTransitPoints`
7.  [Vehicle online ](./vehicles) - `${BASE}/GetVehicles`

where `BASE` is the base url of service for each city like

```
http://sip.ztm.lublin.eu/AndroidService/SchedulesService.svc
```
