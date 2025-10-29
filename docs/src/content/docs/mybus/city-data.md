---
title: City data
---

City data is present in compiled app in the form of an enum.

```java
new (2, "LUBLIN (ZTM)", 22.55673d, 51.24343d, "http://sip.ztm.lublin.eu/AndroidService/SchedulesService.svc", "LUBLI", "pl");
```

This java snippet becomes

```ts
const CITIES = {
    // ...
    LUBLIN: {
        id: 'lublin',
        code: 'LUBLI',
        carrier: 'LUBLIN (ZTM)',
        position: { longitude: 22.55673, latitude: 51.24343 },
        url: 'http://sip.ztm.lublin.eu/AndroidService/SchedulesService.svc',
        locale: locales.PL,
    },
    //...
} as const;
```

The `id` property was given for the sake of keeping the code more readable as some of the city codes can be confusing (like `OLEKA` for `Ostrołęka` and `OSTRO` for `Ostrów Wielkopolski`).

There is also a curious problem with locales.

```ts
const locales = {
    PL: 'pl', // Poland
    CZ: 'cs', // Czechia // This is inaccurate as the locale should be CZ
    SK: 'sk', // Slovakia
    LT: 'pl', // Lithuania // For some reason only lithuanian city has a polish locale
} as const;
```
