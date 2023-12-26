import type { Apply, Fn, Primitive } from "../../core/index.ts";

export type Create<
	pattern,
	args extends unknown[],
> = pattern extends infer p extends Fn
	? Apply<p, args>
	: pattern extends Primitive
	  ? pattern
	  : pattern extends readonly [any, ...any]
		  ? { [key in keyof pattern]: Create<pattern[key], args> }
		  : pattern extends readonly (infer V)[]
			  ? Create<V, args>[]
			  : pattern extends object
				  ? { [key in keyof pattern]: Create<pattern[key], args> }
				  : pattern;
