import type { Call, Fn } from "../../core/index.ts";
import type { Equal } from "../../internal/Equal.ts";
import type { Assign } from "./Assign.ts";
import type { ParsePath } from "./utils.ts";

export type Update<obj, path, fnOrValue> = RecursiveUpdate<
	obj,
	ParsePath<path>,
	fnOrValue
>;

type RecursiveUpdate<obj, pathList, fnOrValue> = obj extends any
	? pathList extends [infer first, ...infer rest]
		? first extends keyof obj
			? {
					[K in keyof obj]: Equal<first, K> extends true
						? RecursiveUpdate<obj[K], rest, fnOrValue>
						: obj[K];
			  }
			: [first, obj] extends ["number", readonly any[]]
			  ? RecursiveUpdate<Extract<obj, any[]>[number], rest, fnOrValue>[]
			  : Assign<
						[
							obj,
							{
								[K in Extract<first, PropertyKey>]: RecursiveUpdate<
									{},
									rest,
									fnOrValue
								>;
							},
						]
				  >
		: fnOrValue extends Fn
		  ? Call<Extract<fnOrValue, Fn>, obj>
		  : fnOrValue
	: never;
