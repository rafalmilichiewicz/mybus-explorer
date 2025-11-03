---
title: Diagram
sidebar:
    order: 2
---

<style>
table {
  width: auto;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
}

.table-container {
  display: flex;
  justify-content: center;
}
</style>

Database diagrams has been constructed on this assumption.

<div class="table-container">

| Type   | Parsed Name | Original Name |
| ------ | ----------- | ------------- |
| string | Example     | ex            |

</div>

## "Loose" Tables

```mermaid
erDiagram
    direction LR
    CONFIG {
        string NAME "name"
        string VALUE "value"
    }

    METADATA {
        int ID "id_wersja"
        date VALID_FROM "wazna_od"
        string GENERATION "generacja"
    }

    NOTICES {
        string ROUTE_NUMBER "numer_linii"
        string TYPE "ozn_uwagi"
        string CONTENT "tresc_uwag"
    }

    SALES_POINTS {
        int ID "id"
        string NAME "nazwa"
        float LONGITUDE "lon"
        float LATITUDE "lat"
        int TYPE "id_pktp"
    }
```

## Related Tables

```mermaid
erDiagram

    CALENDAR {
        string TYPE "td_rj"
        date DATE "dt_kal"
    }



    DAYS {
        string TYPE "typ_dnia"
        string DESCRIPTION "opis_dnia"
        int ORDER "kolej_wydr"
    }

    DEPARTURES {
        int STOP_ID "bus_stop_id"
        string DAY_TYPE "typ_dnia"
        string ROUTE_NUMBER "numer_lini"
        string ROUTE_VARIANT "war_trasy"
        string DEPARTURES "odjazdy"
        int DESTINATION_ID "id_krn"
        int STOP_NUMBER_ON_ROUTE "lp_przyst"
    }

    DESTINATIONS {
        string ROUTE_NUMBER "numer"
        string ROUTE_VARIANT "war_trasy"
        string DESTINATION "opis_tabl"
        string ROUTE_DIRECTION "kierunek"
        bool _DEFAULT_VARIANT "podstawowy"
        string TRANSPORT_MODE "transport"
        string ROUTE "trasa"
        string ROUTE_CODE "kod"
        int ID "id_krn"
        string _DESCRIPTION "opis2tabl"
        int _DESCRIPTION_NUMBER "lp_opis2tabl"
    }



    STOPS {
        int ID_SIP "id"
        int STREET_ID "id_ul"
        string NAME "nazwa"
        string ID_ZTM "numer"
        string _POST "slupek"
        string DEPARTURES "odjazdy"
        float LONGITUDE "lon"
        float LATITUDE "lat"
        string TRANSPORT_MODE "transport"
        string ROUTES_BUS "linieA"
        string ROUTES_TRAM "linieT"
        string ROUTES_TROLLEYBUS "linieR"
        int ORDER "sort"
        string DESTINATIONS "kierunek"
        string _TAB_TYPE "typ_tab"
    }

    STREETS {
        int ID "id"
        string NAME "nazwa"
    }

    %% === Relationships ===
    STOPS ||--o{ DEPARTURES : "has many"
    DEPARTURES }o--|| DESTINATIONS  : "refers to"
    DEPARTURES }o--|| DAYS : "refers to"
    STOPS }o--|| STREETS : "located on"
    CALENDAR }o--|| DAYS : "based on"
```
