import type { Primitive } from "../../core/index.ts";
import type { Keys } from "./Keys.ts";

export type AllPaths<T, ParentPath extends string = never> = T extends Primitive
	? ParentPath
	: unknown extends T
	  ? JoinPath<ParentPath, string, ".">
	  : T extends readonly any[]
		  ? Keys<T> extends infer key extends string | number
				?
						| JoinPath<ParentPath, `[${key}]`>
						| AllPaths<T[number], JoinPath<ParentPath, `[${key}]`>>
				: never
		  : keyof T extends infer key extends keyof T & string
			  ? key extends any
					?
							| JoinPath<ParentPath, key, ".">
							| AllPaths<T[key], JoinPath<ParentPath, key, ".">>
					: never
			  : ParentPath;

type JoinPath<A extends string, B extends string, Sep extends string = ""> = [
	A,
] extends [never]
	? B
	: [B] extends [never]
	  ? A
	  : `${A}${Sep}${B}`;
