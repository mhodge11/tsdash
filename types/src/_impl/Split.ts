/**
 * Split string into a tuple, using a simple string literal separator
 * @description - This is a simple implementation of split, it does not support multiple separators
 *  A more complete implementation is built on top of this one
 * @param str - String to split
 * @param sep - Separator, must be a string literal not a union of string literals
 * @returns Tuple of strings
 */

export type Split<str, sep extends string> = SplitImpl<str, sep>;

type SplitImpl<
	str,
	sep extends string,
	acc extends string[] = [],
> = str extends ""
	? acc
	: str extends `${infer T}${sep}${infer U}`
	  ? SplitImpl<U, sep, [...acc, T]>
	  : [...acc, str];
