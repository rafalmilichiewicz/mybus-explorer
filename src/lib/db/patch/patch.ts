import type { RoutePatch } from './patch-route.ts';
import type { Stop } from '../schema/stop.ts';
import type { StopPatch } from './patch-stop.ts';

export type DatabasePatches = {
    $schema: string;
    routes: {
        patches: RoutePatch[];
    };
    stops: {
        include: Stop['idSip'][];
        patches: StopPatch[];
    };
};

export const EMPTY_PATCHES: DatabasePatches = {
    $schema: '',
    routes: {
        patches: [],
    },
    stops: {
        include: [],
        patches: [],
    },
};
