/**
 * Trims specified characters from the start of the string.
 *
 * *Use the native [trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) method if you want to trim whitespace.*
 *
 * @example
 * ```typescript
 * trimStart('$$$abc', '$') // => 'abc'
 * trimStart('_!!_abc', '_!') // => 'abc'
 * ```
 *
 * @param str The string to trim
 * @param chars The characters to trim
 * @returns The trimmed string
 */

export function trimStart(str: string, chars: string): string {
	let startIndex = 0;
	while (startIndex < str.length && chars.includes(str[startIndex] as string))
		startIndex++;
	return str.slice(startIndex);
}
