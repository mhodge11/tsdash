/**
 * Checks if given string is a valid URL
 *
 * @example
 * ```ts
 * isUrl('https://google.com')
 * // => true
 * isUrl('google.com')
 * // => false
 * ```
 *
 * @param str The string to check
 * @returns Returns `true` if given string is a valid URL, else `false`
 */

export function isUrl(str: string): boolean {
	try {
		new URL(str);
		return true;
	} catch {
		return false;
	}
}
