import { CONFIG } from '../../consts/config.ts';
import { ENDPOINTS } from '../../consts/endpoints.ts';
import { fetchDataXml } from '../requests/fetch.ts';
import generateHeaders from '../token/header.ts';
import type {
    RouteTransitPointsApi,
    TransitPointApi,
    RouteStop,
    RoutePoint,
    RouteTransitPoints,
    TransitPoint,
} from './point.ts';

function validateContinuityBetweenStops(data: RouteTransitPointsApi['R']['T']): boolean {
    for (let i = 0; i < data.length - 1; i++) {
        const current = data[i];
        const next = data[i + 1];
        if (current.i2 !== next.i1) {
            return false;
        }
    }
    return true;
}
function validateContinuityBetweenPoints(data: RouteTransitPointsApi['R']['T']): boolean {
    for (let i = 0; i < data.length; i++) {
        let points = data[i].Pkt ?? [];
        points = Array.isArray(points) ? points : [points];

        if (points.length > 0) {
            const pointNumbers = points.map((p) => Number.parseInt(p.l));
            // Length check
            if (pointNumbers[pointNumbers.length - 1] !== pointNumbers.length) {
                console.log('length');
                return false;
            }

            // Sequence check
            for (let j = 1; j < pointNumbers.length; j++) {
                if (pointNumbers[j] - 1 !== pointNumbers[j - 1]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function validateRouteData(data: RouteTransitPointsApi['R']['T']): boolean {
    const continuityBetweenStops = validateContinuityBetweenStops(data);
    const continuityBetweenPoints = validateContinuityBetweenPoints(data);

    return continuityBetweenStops && continuityBetweenPoints;
}

export async function getRouteTransitPoints(
    routeNumber: string,
    routeVariant: string
): Promise<RouteTransitPoints> {
    const headers = await generateHeaders(CONFIG.CITY.AGE);
    const data = await fetchDataXml<RouteTransitPointsApi>(
        `${ENDPOINTS.ROUTE_TRANSIT_POINTS}?cRoute=${routeNumber}&cRouteVariant=${routeVariant}`,
        headers
    );
    console.log(JSON.stringify(data));

    if (!validateRouteData(data.R.T)) {
        console.log(`Encountered problem with route ${routeNumber}-${routeVariant}`);
    }
    const transitPoints: TransitPoint[] = [];

    for (const routePoint of data.R.T) {
        transitPoints.push({
            type: 'stop',
            id: Number.parseInt(routePoint.i1),
        } satisfies RouteStop);

        let routePoints = routePoint.Pkt ?? [];
        routePoints = Array.isArray(routePoints)
            ? routePoints
            : ([routePoints] as TransitPointApi[]);
        for (const routePoint of routePoints) {
            transitPoints.push({
                type: 'point',
                position: {
                    longitude: Number.parseFloat(routePoint.x),
                    latitude: Number.parseFloat(routePoint.y),
                },
            } satisfies RoutePoint);
        }
    }

    return {
        route: {
            number: routeNumber,
            variant: routeVariant,
        },
        points: transitPoints,
    };
}
