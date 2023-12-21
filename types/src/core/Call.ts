import type { ExcludePlaceholders } from "./impl/impl.ts";
import type { _ } from "./partial.ts";
import type { Fn } from "./Fn.ts";

/**
 * Calls a TSDash function.
 *
 * @param fn - The function to call.
 * @param ...args - optional arguments
 *
 * @example
 * ```ts
 * type T0 = Call<Numbers.Add<1, 2>>; // 3
 * type T1 = Call<Numbers.Add<1>, 2>; // 3
 * type T2 = Call<Numbers.Add, 1, 2>; // 3
 * type T3 = Call<
 *    Tuples.Map<Strings.Split<".">, ["a.b", "b.c"]>
 * >; // [["a", "b"], ["b", "c"]]
 * ```
 */

export type Call<
	fn extends Fn,
	arg0 = _,
	arg1 = _,
	arg2 = _,
	arg3 = _,
> = (fn & {
	[rawArgs]: ExcludePlaceholders<[arg0, arg1, arg2, arg3]>;
})["return"];

declare const rawArgs: unique symbol;
type rawArgs = typeof rawArgs;
