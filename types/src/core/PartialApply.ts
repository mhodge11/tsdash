import type { MergeArgs } from "./impl/impl.ts";
import type { Apply } from "./Apply.ts";
import type { Fn } from "./Fn.ts";

/**
 * `PartialApply` Pre applies some arguments to a function.
 * it takes a `Fn`, and a list of pre applied arguments,
 * and returns a new function taking the rest of these arguments.
 *
 * Most functions in HOTScript are already partially applicable (curried).
 *
 * @param fn - The function to partially apply.
 * @param partialArgs - The arguments to partially apply.
 * @returns The partially applied function.
 *
 * @example
 * ```ts
 * interface Append extends Fn {
 *    return: [...this['arg1'], this['arg0']]
 * }
 *
 * type Append1 = PartialApply<Append, [1]>
 * type T0 = Call<Append1, [0]>; // [0, 1]
 *
 * type AppendTo123 = PartialApply<Append, [_, [1, 2, 3]]>
 * type T1 = Call<AppendTo123, 4>; // [1, 2, 3, 4]
 */

export interface PartialApply<fn extends Fn, partialArgs extends unknown[]>
	extends Fn {
	return: MergeArgs<this["args"], partialArgs> extends infer args extends
		unknown[]
		? Apply<fn, args>
		: never;
}
