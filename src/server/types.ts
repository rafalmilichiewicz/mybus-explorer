import type { ApiWrapper } from '../lib/api/wrapper.ts';
import type { Config } from '../lib/consts/config.ts';

export type Variables = { api: ApiWrapper; config: Config };
