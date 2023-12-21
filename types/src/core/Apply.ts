import type { Fn } from "./Fn.ts";

/**
 * Call a TSdash function with the given arguments.
 *
 * @param fn - The function to call.
 * @param args - The arguments to pass to the function.
 * @returns The result of the function.
 *
 * @example
 * ```ts
 * type T0 = Apply<Numbers.Add, [1, 2]>; // 3
 * ```
 */

export type Apply<fn extends Fn, args extends unknown[]> = (fn & {
	[rawArgs]: args;
})["return"];

declare const rawArgs: unique symbol;
type rawArgs = typeof rawArgs;
