import type { Call } from "../../core/index.ts";
import type { Strings } from "../../strings/index.ts";

export type Keys<src> = src extends readonly unknown[]
	? {
			[key in keyof src]: key;
	  }[number] extends infer res
		? res extends string
			? Call<Strings.ToNumber, res> & keyof src
			: res & keyof src
		: never
	: keyof src;
