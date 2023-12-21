import type { Call } from "./Call.ts";
import type { Fn } from "./Fn.ts";

/**
 * Pipe a value through a list of functions.
 * @description This is the same as the pipe operator in other languages.
 * Calls the last function with the initial value, then passes the result to the second to last function, and so on.
 *
 * @param fns - The list of functions to pipe the value through.
 * @param acc - The initial value to pass to the last function.
 * @returns The result of the first function.
 *
 * @example
 * ```ts
 * type T0 = PipeRight<[Numbers.Add<1>, Numbers.Negate], 1>; // 0
 */

export type PipeRight<fns extends Fn[], acc> = fns extends [
	...infer rest extends Fn[],
	infer last extends Fn,
]
	? PipeRight<rest, Call<last, acc>>
	: acc;
