---
title: Notices
---

This table supposedly stores active notices, but at the time of testing and writing neither Lublin, nor Chełm nor Łódź, nor Gdańsk had any notices.

## Original Structure

```ts
export const _noticeSql = {
    numer_linii: '',
    ozn_uwagi: '',
    tresc_uwag: '',
};
```

## Parsed Type

```ts
export type Notice = {
    routeNumber: Route['number'];
    name: string;
    content: string;
};
```
