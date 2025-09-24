// TODO Move Types
export type SomeOtherString = string & NonNullable<unknown>;
export type ValuesToKeys<T> = T[keyof T];
// deno-lint-ignore no-explicit-any
export type RequiredRecord<K extends keyof any, V> = {
    [P in K]-?: V;
};
export type Row<T extends string> = RequiredRecord<T, unknown>;

export type DatabaseSchema = {
    __table__: string;
    __columns__: Record<string, string>;
};
