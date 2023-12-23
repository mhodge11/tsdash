/**
 * Converts the characters `&`, `<`, `>`, `"` and `'` in a string to their corresponding HTML entities.
 *
 * @example
 * ```typescript
 * escapeHtml('fred, barney, & pebbles')
 * // => 'fred, barney, &amp; pebbles'
 * ```
 *
 * @param str The string to escape
 * @returns Returns the escaped string
 */

export function escapeHtml(str: string): string {
	// biome-ignore lint/style/noNonNullAssertion: escapeChars.get(char) is always defined
	return str.replace(charRegex, (char) => escapeChars.get(char)!);
}

const charRegex = /["&'<>]/g;
const escapeChars = new Map([
	["&", "&amp;"],
	["<", "&lt;"],
	[">", "&gt;"],
	["'", "&#39;"],
	['"', "&quot;"],
]);
