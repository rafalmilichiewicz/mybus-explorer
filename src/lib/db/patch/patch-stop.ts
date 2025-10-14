import type { Stop } from '../schema/stop.ts';

export type StopPatch = {
    id: Stop['idSip'];
    patch: Partial<Stop>;
};
