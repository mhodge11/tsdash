/**
 * Checks if the current environment is a browser.
 *
 * @returns `true` if the current environment is a browser, else `false`.
 */
export function isBrowser() {
	return typeof globalThis.window !== "undefined";
}
