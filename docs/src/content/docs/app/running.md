---
title: Setup and running
sidebar:
    order: 2
---

To run this app you need:

-   Deno 2
-   (Optional) Docker - if you want to run this through `docker compose`

You can run one of these predefined deno tasks:

-   `dev`: Main development (main.ts) with watcher
-   `scrape`: Run app and scrape online vehicles
-   `server`: Run server,
-   `test`: Run test suite,
-   `lint`: Run Deno's linter.

Or you can tinker with the code directly.

For docker use `docker compose up`.

After running following folders and data will be created

```
└── resources
    ├── lublin // city id for more info check Environment variables
    │   └── 2025-10-01_4565_1 // Schedule data <Valid since date>_<version>_<generation>
    │       ├── data
    │       │   ├── patches.json // To learn more check Patches
    │       │   └── schedule.sqlite // Database
    │       ├── generated // Generated data
    │       │   ├── calendar.json
    │       │   ├── config.json
    │       │   ├── departures.json
    │       │   ├── metadata.json
    │       │   ├── notices.json
    │       │   ├── points_of_sale.json
    │       │   ├── routes.json
    │       │   ├── stops.json
    │       │   ├── streets.json
    │       │   └── transit_points.json
    │       └── observations
    │           └── vehicles.ndjson // Scraped
    ├── metadata.json // Current schedule metadata
    ├── schedule.sqlite // Current schedule database
    └── schema.json // JSON Schema for patches
```
