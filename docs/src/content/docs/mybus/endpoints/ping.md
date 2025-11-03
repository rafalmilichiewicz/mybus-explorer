---
title: Ping - "Security"
sidebar:
    order: 2
---

## Endpoint

```
${BASE}/PingService
```

## Logic

Each request must be sent with the `age` HTTP header in order to succeed.

Value of this can be obtained via ping endpoint, but `age` header also needs to be present for this endpoint.

Here is the algorithm used to compute the value of `age` for ping endpoint.

```ts
export default function generateCityOffset(cityCode: string) {
    const offset = cityCode.split('').reduce((acc, val) => acc + val.charCodeAt(0), 0);
    return offset;
}

const AGE_BASE = 60;

export function generateAgeHeader(cityOffset: number) {
    return cityOffset + AGE_BASE;
}
```

1. Get the city code - 5 character string that uniquely represents the city
2. Perform a sum operation on each character's ASCII code
3. Add 60 to city offset

For Lublin it is like so:

```
City Lublin -->
LUBLI -> L + U + B + L + I -->
-> 376 ->
376 + 60 -> 436
AGE = 436
```

With that ping endpoint will return a value for age that can be used in all other endpoints.

:::note
There is huge possibility that value returned by ping endpoint is deterministic - can be computed beforehand. The value changes everyday, but is constant thought the day. It follows a cycle where the value increments everyday and then, after about a month, "resets" to a lower value.
:::
