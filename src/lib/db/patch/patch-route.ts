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

// // TODO Remove and add JSON read with schema
// export const patchesRoute = [
//     {
//         number: ['160', '950'],
//         patch: {
//             transportMode: {
//                 id: 'R',
//                 type: 'trolleybus',
//             },
//         },
//     },
//     {
//         number: ['N1', 'N2', 'N3'],
//         patch: {
//             night: true,
//         },
//     },
//     {
//         number: ['950', 'B', 'Z'],
//         patch: {
//             depot: true,
//         },
//     },
// ] satisfies RoutePatch[];
