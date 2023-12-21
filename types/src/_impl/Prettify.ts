/**
 * prettify type to be more readable
 */

export type Prettify<T> = { [K in keyof T]: T[K] } | never;
