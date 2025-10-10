import type { Route } from "../schema/destination.ts";


// TODO Force either id or number to be present
// ?  discriminated union ?
export type RoutePatch = {
    id?: Route['id'];
    number?: Route['number'][];
    patch: Partial<Route>;
};

// TODO Remove and add JSON read with schema
export const patchesRoute = [
    {
        number: ['160', '950'],
        patch: {
            transportMode: {
                id: 'R',
                type: 'trolleybus',
            },
        },
    },
    {
        number: ['N1', 'N2', 'N3'],
        patch: {
            night: true,
        },
    },
    {
        number: ['950', 'B', 'Z'],
        patch: {
            depot: true,
        },
    },
] satisfies RoutePatch[];