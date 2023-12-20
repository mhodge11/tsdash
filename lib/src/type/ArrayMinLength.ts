/**
 * This type builds an array with a minimum length.
 *
 * @example
 * ```typescript
 * let arr: ArrayMinLength<number, 3> = [1, 2, 3];
 * // => OK
 *
 * arr = [1, 2];
 * // => Type '[number, number]' is not assignable to type '[number, number, number, ...number[]]'.
 * ```
 *
 * @template T The type of the array elements
 * @template L The minimum length of the array
 */

export type ArrayMinLength<T, L extends number> = BuildArrayMinLength<T, L>;

type BuildArrayMinLength<
	T,
	L extends number,
	I extends T[] = [],
> = I["length"] extends L
	? [...I, ...T[]]
	: BuildArrayMinLength<T, L, [...I, T]>;
