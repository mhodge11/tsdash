/**
 * Split a string into words. Can deal with camelCase, PascalCase & snake_case.
 *
 * @example
 * ```typescript
 * splitWords('camelCase')
 * // => ['camel', 'Case']
 *
 * splitWords('PascalCase')
 * // => ['Pascal', 'Case']
 *
 * splitWords('hello_world-123')
 * // => ['hello', 'world', '123']
 * ```
 *
 * @param str The string to split into words
 * @returns An array of words
 */

export function splitWords(str: string): string[] {
	return str.match(wordsRegex) ?? [];
}

const wordsRegex =
	/(?:\d*[a-z]+)|(?:[A-Z][a-z]+)|(?:\d*[A-Z]+(?=[^a-z]|$))|\d+/g;
