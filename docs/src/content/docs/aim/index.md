---
title: Aim and scope
---

_This project is for research and educational purposes only. Do not misuse public APIs and respect ethical boundaries_

## Aim

The main aim of this project is to deepen technical understanding through:

-   Reverse-engineering of the MyBus mobile app’s and public API calls (converting obfuscated parameters to human-readable form)
-   By far most important learning:
    -   API design and interaction,
    -   Database querying and structure,
    -   Data transformation pipelines,
    -   Software architecture,
    -   Containerization.

## Scope

### Included

-   Creating a proxy to transform API responses into human-readable formats,
-   Documenting all public API endpoints,
-   Analyzing the database schema and relationships,
-   Mapping mobile app UI logic to backend data flows,
-   Generating structured, human-readable assets (e.g., route/stops data),
-   Building a server to expose transformed data,
-   Creating a patch system to "fix" original database shortcomings,
-   Validating core functionality through targeted testing,
-   Project documentation.

### Excluded

-   User interface (GUI) or frontend implementation - this project is focused on data,
-   Data analysis - this project may be used to generate raw data for further analysis,

### Assumptions

-   Data extracted from database is "valid" by this it can be a incomplete for the sake of not generating garbage data e.g. only the stops that are used by at least one route are included.
-   Due to resource and time constraints the main city chosen for tests is Lublin. Thus some features may have not been available to test. In some instances functionalities have been cross-checked with Gdańsk and Chełm.
-   Preserving the unknown - in case of uncertainty or "new" the original is passed with the "unknown" flag.

## Disclaimer

This project is by no means production ready. While significant amount of time has been spent on developing this solution, it is not professional. Use at your own discretion.

> _"It may be a spaghetti code, but I cooked it"_ ~Author
