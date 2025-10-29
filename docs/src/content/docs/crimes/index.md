---
title: Programming War Crimes
---

While working on this project, there were _few_ infuriating choices taken by the authors of MyBus app. They are perfect examples to show "How not to do things" or a "Great Reverse-engineering Detective Mystery", depending on how you view it 😉.

Here lies incomplete (and growing...) list of Programming War Crimes committed by this atrocity.

## General

-   `SOAP` and `XML` - alone not the worst but this _implementation_ is just next level. No one expected sending XML message containing **one** tag with stringified JSON in web version (main deterrent and reason why mobile app was chosen to reverse-engineer).
-   Descriptiveness of names (or lack thereof):
    -   Field with friendly and easy to understand names in API:
        -   `kwi` - Brigade,
        -   `nop` - Next destination,
    -   Columns with friendly and easy to understand names in DB:
        -   `opis2tabl` - still an unknown.
-   Magic character/number constants:
    -   Everyone knows that:
        -   `A` stands for autobus (eng. Bus),
        -   `T` stands for tramwaj (eng. Tram),
        -   `R` stands for trolejbus (eng. Trolleybus) - I guess the T was already taken and they picked the second letter.
-   Hotchpotch of naming styles and naming conventions - we have:
    -   Snake Case: `dt_kal`,
    -   Camel Case: `linieA`, `linieR`,
    -   Whatever **this** is: `lp_opis2tabl`.
-   Using locales and shortenings of countries that **don't exist anymore** - `.cs` was technically reserved for Czechoslovakia
-   Not bothering to extend the system for other countries and locales - one and lonely Lithuanian city uses Polish locale in code.
-   Database and API, despite being done for the same project and use case, have very little overlapping ids and some functionalities **CANNOT** be implemented without external lookup table, which is private...

## Database

### Structure

Database has:

-   No foreign keys and **sometimes** primary key,
-   No indexes,
-   No constraints = more freedom!,
-   Inconsistent column names that change from table to table,
-   Very little semblance of following SQL paradigm of creating database,
-   INCORRECT or FALSE information (which is probably a result of no validation and allowing non-technical personel to interact with database):
    -   Stops having wrong type - tram stop in city without trams,
    -   Existence of stops that are most likely a dummy data like `the Wild Riverside Park` in the middle of concrete and not being near any existing stop,
    -   Routes having a wrong type - trolleybus exclusive route being categorized as bus one,
    -   Offline schedule having only one variant of route being default (misleading everyone).

### Naming

Table names are in `Polish`, but columns names are in `Ponglish`.

```sql
SELECT bus_stop_id, id_krn, numer_lini FROM ODJAZDY`
```

This query reads like modern-day poetry 😍.

### Not so SQL database

There are few instances where there is nested data present, but it's done very **_uniquely_**.

-   Column `kierunek` in table `przystanki` holds a comma delimited string with destinations for given stop, but there is a catch. This should be a computed field - generated automatically based on already present data, but this thing is hand inserted. How do I know this? Because it's wrong. It has only 2 values max, so there is a data loss, and the destinations are picked arbitrarily.
-   Here is a sample value taken from column `odjazdy` that represents departures for each dayType-route-routeVariant-stop combination: `64080,,80400,,84480,`. Yes this is double delimited comma string with one trailing comma at the end, you are not seeing things. And numbers in this string are seconds since midnight so this would convert to human readable `17:48,22:20,23:28` in 24-hour system.

## API

-   Sending entire Sqlite database over unencrypted HTTP,
-   "Securing" the API with `age` HTTP header - This is basically a Caesar cipher in this day and age,
-   Exposing (or failing to secure) server logs,
-   Calling Ping Service and Compare Schedule endpoints before **every** request,
-   No way of checking what is the current version of schedule database - only comparing,
-   Transit points list one OR zero indexed - just... why?!,
-   Having essentially no rate limiting features - please don't DDOS this because it will break.

## Concussion

This whole thing essentially hangs on by a thread and is only held by a duct tape and faith of the intern maintaining this. The scope of API and mobile App is not grand and essentially boils down to 7 endpoints and few views, but it still is labyrinthine.
