import { deburr } from "./deburr.ts";
import { splitWords } from "./splitWords.ts";

/**
 * Converts `string` to camelCase.
 *
 * @example
 * ```typescript
 * camelCase('Foo Bar')
 * // => 'fooBar'
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 * ```
 *
 * @param str The string to convert
 * @returns Returns the camel cased string
 */

export function camelCase(str: string): string {
	str = deburr(str);
	const words = splitWords(str);

	let camelCase = "";
	for (const [index, word] of words.entries())
		camelCase +=
			index === 0
				? word.toLowerCase()
				: `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

	return camelCase;
}
