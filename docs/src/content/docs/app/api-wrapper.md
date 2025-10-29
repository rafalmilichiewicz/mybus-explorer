---
title: API Wrapper
---

````ts
export class ApiWrapper {
    constructor() {}

    public schedule = {
        /**
         * Downloads and saves a schedule database file from the API
         *
         * This function fetches a gzipped schedule database from the API endpoint,
         * decompresses it, and saves it to the specified filename.
         *
         * @param filename - The path where the decompressed database file will be saved
         * @returns Promise<boolean> - Returns true if successful, false if failed
         *
         * @example
         * ```typescript
         * const success = await getScheduleDatabase('schedule.db');
         * if (success) {
         *   console.log('Database downloaded successfully');
         * }
         * ```
         *
         * @throws Error - If the download or decompression fails
         */
        saveToFile: getScheduleDatabase,
        /**
         * Fetches and returns a stream of the schedule database
         *
         * This function fetches a gzipped schedule database from the API endpoint
         * and returns a readable stream of the decompressed data.
         *
         * @returns Promise<ReadableStream<Uint8Array> | undefined> - Returns a readable stream of decompressed data or undefined if failed
         *
         * @example
         * ```typescript
         * const stream = await getScheduleDatabaseStream();
         * if (stream) {
         *   // Process the database stream e.g. save to file
         * }
         * ```
         *
         * @throws Error - If the download or decompression fails
         */
        getStream: getScheduleDatabaseStream,

        /**
         * Compares schedule version with the current schedule
         *
         * This function checks whether the schedule has changed by comparing the provided
         * version and generation numbers with the current schedule on the server.
         *
         * @param version - The version number of the schedule to compare against
         * @param generation - The generation number of the schedule to compare against
         * @returns Promise<boolean> - Resolves to true if the schedule has not changed (version matches), false if it has changed
         *
         * @example
         * ```typescript
         * const isUpToDate = await compareSchedule(12345, 67890);
         * if (isUpToDate) {
         *   console.log('Schedule is up to date');
         * } else {
         *   console.log('Schedule has been updated');
         * }
         * ```
         *
         * @remarks
         * The function makes a request to the schedule comparison endpoint with the specified
         * version and generation parameters. It returns true when the comparison result equals 0,
         * indicating no changes in the schedule.
         */
        checkIfChanged: compareSchedule,
    };

    public timetable = {
        /**
         * Fetches timetable information for a specific vehicle
         *
         * This function retrieves the complete schedule for a given vehicle side number,
         * including all stops along the route with their scheduled times.
         *
         * @param sideNumber - The vehicle side number to fetch timetable for
         * @returns Promise<TimetableVehicle> - Resolves to an object containing vehicle timetable information
         *
         * @example
         * ```typescript
         * try {
         *   const timetable = await getTimetableForVehicle('1234');
         *   console.log(`Route: ${timetable.route.number}-${timetable.route.variant}`);
         *   console.log(`Stops: ${timetable.stops.length}`);
         * } catch (error) {
         *   console.error('Failed to fetch vehicle timetable:', error);
         * }
         * ```
         *
         * @remarks
         * The function processes XML data from the API and transforms it into a standardized
         * timetable format with stop information, scheduled times, and tracking status.
         */
        getForVehicle: getTimetableForVehicle,
        /**
         * Fetches timetable information for a specific stop
         *
         * This function retrieves the timetable data for a given stop ID, including
         * departure information for all scheduled routes at that stop.
         *
         * @param stop - The stop SIP ID to fetch timetable for
         * @returns Promise<TimetableStop> - Resolves to an object containing stop timetable information
         *
         * @example
         * ```typescript
         * try {
         *   const timetable = await getTimetableForStop(123);
         *   console.log(`Current time: ${timetable.currentTime}`);
         *   console.log(`Departures: ${timetable.departures.length}`);
         * } catch (error) {
         *   console.error('Failed to fetch timetable:', error);
         * }
         * ```
         *
         * @remarks
         * The function processes XML data from the API and transforms it into a standardized
         * timetable format with departure information, route details, and vehicle information.
         */
        getForStop: getTimetableForStop,
    };

    /**
     * Fetches vehicle information for routes
     *
     * This function retrieves vehicle position data for all vehicles or
     * vehicles on a specific route.
     *
     * @param route - Optional route number to filter vehicles. Empty string returns all vehicles
     * @returns Promise<VehicleEnRoute[]> - Resolves to an array of vehicle information objects
     *
     * @example
     * ```typescript
     * // Get all vehicles
     * const allVehicles = await getVehicles();
     *
     * // Get vehicles for route 123
     * const routeVehicles = await getVehicles('123');
     * ```
     *
     * @remarks
     * The function processes XML data from the API and transforms it into a standardized
     * vehicle information format with position coordinates, route details, status information,
     * and scheduling data.
     */
    public getOnlineVehicles = getVehicles;

    /**
     * Fetches transit points for a specific route number and variant
     *
     * This function retrieves the transit points (stops and intermediate points)
     * for a given route number and variant from the API endpoint.
     *
     * @param routeNumber - The route number (e.g., "123")
     * @param routeVariant - The route variant (e.g., "A", "B")
     * @returns Promise<RouteTransitPoints> - Resolves to an object containing the route information and its transit points
     *
     * @throws Error - If the route data validation fails or if the API request fails
     *
     * @example
     * ```typescript
     * try {
     *   const routeData = await getRouteTransitPoints('123', 'A');
     *   console.log(`Route ${routeData.route.number}-${routeData.route.variant}`);
     *   console.log(`Found ${routeData.points.length} transit points`);
     * } catch (error) {
     *   console.error('Failed to fetch route data:', error);
     * }
     * ```
     *
     * @remarks
     * The function validates the retrieved route data and throws an error if validation fails.
     * The returned data includes both stop points and intermediate points with their coordinates.
     */
    public getTransitPointsForRoute = getRouteTransitPoints;
}

const api = new ApiWrapper();
````
