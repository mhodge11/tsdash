import type { Apply, Fn } from "../../core/index.ts";
import type { Primitive } from "../../internal/Primitive.ts";

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
