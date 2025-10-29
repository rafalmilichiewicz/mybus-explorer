---
title: Application overview
sidebar:
    order: 1
---

## Used technologies

### Code

-   TypeScript
-   Deno 2
-   Sqlite 3
-   Hono with Zod, OpenAPI spec and SwaggerUI
-   JSON streaming (NDJSON)
-   JSON schema
-   Docker compose

### Testing

-   Deno's built in suite
-   JSR standard libraries like `@std/assert`
-   Github CI/CD

### Documentation

-   Astro with Starlight theme
-   Github CI/CD

### Utility

-   Proxyman - iOS/macOS HTTP traffic capture tool
-   DBeaver - Sqlite exploration
-   D-Tale - rapid data exploration of Pandas DataFrames (produced JSONs)
-   Insomnia - Postman alternative for testing API calls

## Folder structure

```
.
├── docs // 
├── src // App source code
│   ├── lib // Common implementation code
│   ├── runtime // App runtime
│   └── server // Hono server
└── tests // App tests
```