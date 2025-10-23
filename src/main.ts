import { ApiWrapper } from './lib/api/wrapper.ts';
import { AppRuntime } from './runtime/runtime.ts';

if (import.meta.main) {
    const runtime = await AppRuntime.initialize(new ApiWrapper());
    await runtime.scrapeVehiclesOnlineToNdjson();

    const data = await runtime.convertScrapingToJson();
    const flattened = data.flatMap((el) => el);
    console.log(`Current entries count: ${flattened.length}`);
}
