export type ParsePath<
	path,
	output extends string[] = [],
	currentChunk extends string = "",
> = path extends number
	? [`${path}`]
	: path extends `${infer first}${infer rest}`
	  ? first extends "." | "[" | "]"
			? ParsePath<
					rest,
					[...output, ...(currentChunk extends "" ? [] : [currentChunk])],
					""
			  >
			: ParsePath<rest, output, `${currentChunk}${first}`>
	  : [...output, ...(currentChunk extends "" ? [] : [currentChunk])];
