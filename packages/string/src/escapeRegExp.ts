/**
 * Escapes the `RegExp` special characters `^`, `$`, `\`, `.`, `*`, `+`,
 * `?`, `(`, `)`, `[`, `]`, `{`, `}`, and `|` in a string.
 *
 * @example
 * ```typescript
 * escapeRegExp('[moderndash](https://moderndash.io/)')
 * // => '\[moderndash\]\(https://moderndash\.io/\)'
 * ```
 *
 * @param str The string to escape
 * @returns Returns the escaped string
 */

export function escapeRegExp(str: string): string {
	return str.replace(escapeCharsRegex, "\\$&");
}

const escapeCharsRegex = /[$()*+.?[\\\]^{|}]/g;
