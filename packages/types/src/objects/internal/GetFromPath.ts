import type { ParsePath } from "./utils.ts";

export type GetFromPath<Obj, path> = RecursiveGet<Obj, ParsePath<path>>;

type RecursiveGet<Obj, pathList> = Obj extends any
	? pathList extends [infer first, ...infer rest]
		? first extends keyof Obj
			? RecursiveGet<Obj[first], rest>
			: [first, Obj] extends [`${number}` | "number", readonly any[]]
			  ? RecursiveGet<Extract<Obj, any[]>[number], rest>
			  : undefined
		: Obj
	: never;
