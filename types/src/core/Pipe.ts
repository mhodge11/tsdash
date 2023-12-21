import type { Call } from "./Call.ts";
import type { Fn } from "./Fn.ts";

/**
 * Pipe a value through a list of functions.
 * @description This is the same as the pipe operator in other languages.
 * Calls the first function with the initial value, then passes the result to the second function, and so on.
 *
 * @param acc - The initial value to pass to the first function.
 * @param fns - The list of functions to pipe the value through.
 * @returns The result of the last function.
 *
 * @example
 * ```ts
 * type T0 = Pipe<1, [Numbers.Add<1>, Numbers.Negate]>; // -2
 * ```
 */

export type Pipe<acc, fns extends Fn[]> = fns extends [
	infer first extends Fn,
	...infer rest extends Fn[],
]
	? Pipe<Call<first, acc>, rest>
	: acc;
