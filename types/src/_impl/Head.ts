/**
 * get the first element of tuple
 * @param tuple - Tuple of any types
 * @returns First element of tuple
 */

export type Head<tuple> = tuple extends [infer first, ...any] ? first : never;
