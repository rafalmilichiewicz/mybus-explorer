# MyBus Explorer

This project is done for research and learning purposes. Please don't misuse public APIs and use this project ethically.

# Used technologies

## Code

-   TypeScript
-   Deno 2
-   Sqlite 3
-   JSON streaming (NDJSON)
-   JSON schema

## Testing

-   Deno's built in suite
-   JSR standard libraries like `@std/assert`

## Documentation

-   Docusaurus

## Utility

-   Proxyman - iOS/macOS HTTP traffic capture tool
-   DBeaver - Sqlite exploration
-   D-Tale - rapid data exploration of Pandas DataFrames (produced JSONs)
-   Insomnia - Postman alternative for testing API calls

# Caveats and Challenges

The database present may contain many inaccuracies, for example:

-   Stops having wrong type - tram stop in city without trams
-   Routes having a wrong type - trolleybus exclusive route being categorized as bus one

## Programming war crimes

On that note, the code, database and API are perfect examples to show "How not to do things" or a "Great reverse engineering detective mystery" depending on how you view it 😉.

Here is incomplete list of war crimes committed by this atrocity:

-   SOAP and XML - alone not the worst but this _implementation_ is just next level. No one expected sending XML message containing one tag with stringified JSON.
-   Sending entire Sqlite database over HTTP
-   Exposing (or failing to secure) server logs
-   Database has:
    -   No foreign keys and sometimes primary key
    -   No indexes
    -   No constraints
    -   Field names are not consistent and change from table to table
-   Whole thing uses hotchpotch of naming styles:
    -   Database:
        -   Table names are in `Polish`
        -   Columns names are in `Ponglish`: `SELECT bus_stop_id, id_krn, numer_lini FROM ODJAZDY` reads like modern-day poetry <3
        -   Mix of naming conventions - we have:
            -   Snake Case: `dt_kal`
            -   Camel Case: `linieA`, `linieR`
            -   Whatever this is: `lp_opis2tabl`
        -   There are few instances where there is nested data present, but it's done very strangely
            -   Column `kierunek` holds a comma delimited string with destinations for given stop, but there is a catch. This should be a computed field - generated automatically based on already present data, but this thing is hand inserted. How do I know this? Because it's wrong. It has only 2 values max, so there is a data loss, and the destinations are picked arbitrarily.
            -   Here is a sample value taken from column `odjazdy` that represents departures for each dayType-route-routeVariant-stop combination: `64080,,80400,,84480,`. Yes this is double delimited comma string with one trailing comma. And numbers in this string are seconds since midnight so this would convert to human readable `17:48,22:20,23:28` in 24-hour system.
    -   Descriptiveness of names (or lack thereof):
        -   Magic char constants:
            -   Everyone knows that:
                -   `A` stands for autobus (eng. Bus)
                -   `T` stands for tramwaj (eng. Tram)
                -   `R` stands for trolejbus (eng. Trolleybus) - I guess the T was already taken and they picked the second letter, but they are the same both in English and Polish.
        -   Field with friendly and easy to understand names:
            -   `kwi` - Brigade
            -   `nop` - Next destination
