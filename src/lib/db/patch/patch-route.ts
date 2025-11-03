import type { Route } from '../schema/destination.ts';

type RoutePatchByNumber = {
    number: Route['number'][];
    patch: Partial<Route>;
};

type RoutePatchById = {
    id: Route['id'];
    patch: Partial<Route>;
};
export type RoutePatch = RoutePatchByNumber | RoutePatchById;

export function isRoutePatchByNumber(patch: RoutePatch): patch is RoutePatchByNumber {
    return 'number' in patch;
}
