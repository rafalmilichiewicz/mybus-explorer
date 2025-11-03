/**
 * String comparison where numbers are first and other strings at the end
 */

export function naturalSort(a: string, b: string) {
    const aNum = Number(a);
    const bNum = Number(b);

    const aIsNum = !isNaN(aNum);
    const bIsNum = !isNaN(bNum);

    if (aIsNum && bIsNum) {
        return aNum - bNum; // normal numeric sort
    }

    if (aIsNum) return -1; // numbers come first
    if (bIsNum) return 1;

    return a.localeCompare(b, 'pl', { numeric: true });
}
