import type { Call, Tuples } from "@tsdash/types";

/**
 * Calculates the sum of an array of numbers.
 *
 * Returns `NaN` if the input array is empty.
 *
 * @example
 * ```ts
 * sum([1, 2, 3, 4, 5]) // => 15
 * ```
 *
 * @param numbers The input array of numbers
 * @template T The type of the input array
 * @returns The sum of the input array
 */

export function sum(numbers: number[]): number;
export function sum<T extends readonly number[]>(
	numbers: T,
): Call<Tuples.Sum, T>;
export function sum<T extends readonly number[]>(
	numbers: T,
): Call<Tuples.Sum, T> | number {
	if (numbers.length === 0) return NaN;
	return numbers.reduce((total, current) => total + current, 0);
}
