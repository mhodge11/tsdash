/**
 * Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;`
 * in a string to their corresponding characters.
 *
 * @example
 * ```ts
 * unescapeHtml('fred, barney, &amp; pebbles')
 * // => 'fred, barney, & pebbles'
 * ```
 *
 * @param str The string to unescape
 * @returns Returns the unescaped string
 */

export function unescapeHtml(str: string): string {
	return str.replace(
		htmlEntitiesRegex,
		// biome-ignore lint/style/noNonNullAssertion: entityMap.get(entity) is always defined
		(entity: string) => entityMap.get(entity)!,
	);
}

const htmlEntitiesRegex = /&(?:amp|lt|gt|quot|#39);/g;
const entityMap = new Map([
	["&amp;", "&"],
	["&lt;", "<"],
	["&gt;", ">"],
	["&quot;", '"'],
	["&#39;", "'"],
]);
