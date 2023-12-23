import type { Prettify, UnionToIntersection } from "../../internal/index.ts";

export type Assign<xs extends readonly any[]> = Prettify<
	UnionToIntersection<xs[number]>
>;
