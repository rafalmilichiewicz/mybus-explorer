import { ApiWrapper } from './lib/api/wrapper.ts';
import { AppRuntime } from './runtime/runtime.ts';

if (import.meta.main) {
    const api = new ApiWrapper();
    try {
        const runtime = await AppRuntime.initialize(api);
        const data = await runtime.convertScrapingToJson();
        const flattened = data.flatMap((el) => el);
        console.log(`Current entries count: ${flattened.length}`);
    } catch (err) {
        console.error(err);
    }
}
