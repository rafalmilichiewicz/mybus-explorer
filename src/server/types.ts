import type { AppRuntime } from './runtime/runtime.ts';
import type { ApiWrapper } from '../lib/api/wrapper.ts';
import type { Config } from '../lib/consts/config.ts';

export type VariablesStandalone = { api: ApiWrapper; config: Config };
export type VariablesWithRuntime = VariablesStandalone & { app: AppRuntime };
