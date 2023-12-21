import type { _, unset } from "@core";
import type { IsNever } from "@impl";

import type { ExcludePlaceholders } from "./ExcludePlaceholders.ts";

export type MergeArgs<
	pipedArgs extends any[],
	partialArgs extends any[],
> = MergeArgsImp<pipedArgs, MapEmptyIntoPlaceholder<partialArgs>>;

type MergeArgsImp<
	pipedArgs extends any[],
	partialArgs extends any[],
	output extends any[] = [],
> = partialArgs extends [infer partialFirst, ...infer partialRest]
	? IsNever<partialFirst> extends true
		? MergeArgsImp<pipedArgs, partialRest, [...output, partialFirst]>
		: [partialFirst] extends [_]
		  ? pipedArgs extends [infer pipedFirst, ...infer pipedRest]
				? MergeArgsImp<pipedRest, partialRest, [...output, pipedFirst]>
				: [...output, ...ExcludePlaceholders<partialRest>]
		  : MergeArgsImp<pipedArgs, partialRest, [...output, partialFirst]>
	: [...output, ...pipedArgs];

type MapEmptyIntoPlaceholder<xs, output extends any[] = []> = xs extends [
	infer first,
	...infer rest,
]
	? MapEmptyIntoPlaceholder<rest, [...output, EmptyIntoPlaceholder<first>]>
	: output;

type EmptyIntoPlaceholder<x> = IsNever<x> extends true
	? never
	: [x] extends [unset]
	  ? _
	  : x;
