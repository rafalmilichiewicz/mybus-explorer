import type { CityCode } from '../../consts/cities.ts';

// TODO Example
/**
 * Based on `cityCode` the `CityOffset is generated.
 *
 * It is simply a sum of ASCII codes of letters in `cityCode`.
 *
 * Part of (Top Notch Security)™
 **/
export default function generateCityOffset(cityCode: CityCode) {
    const offset = cityCode.split('').reduce((acc, val) => acc + val.charCodeAt(0), 0);
    return offset;
}
