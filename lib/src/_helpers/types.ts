import type { ArrayMinLength } from "@type/ArrayMinLength.ts";

/**
 * This type gets the tail of an array.
 *
 * @template T The type of the array
 * @returns Returns the tail of the array
 */

export type ArrayTail<T extends unknown[]> = T extends [unknown, ...infer U]
	? U
	: never;

/**
 * This type builds a compare function.
 *
 * @template T The type of the array
 * @returns Returns the compare function
 */

export type CompareFunction<T extends ArrayMinLength<unknown[], 2>> = (
	a: T[0][number],
	b: ArrayTail<T>[number][number],
) => boolean;
