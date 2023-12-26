/**
 * Checks if the current environment is a navigator.
 *
 * @returns `true` if the current environment is a navigator, else `false`.
 */
export function isNavigator() {
	return typeof globalThis.navigator !== "undefined";
}
