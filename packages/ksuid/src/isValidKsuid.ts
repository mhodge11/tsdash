import { KSUID, debase62 } from "./ksuid.ts";

/**
 * Checks if a KSUID string is a valid KSUID.
 *
 * @param ksuidString A possible KSUID string
 * @returns `true` if the string is a valid KSUID, `false` otherwise
 */
export function isValidKsuid(ksuidString: string) {
	return KSUID.isValid(debase62(ksuidString));
}
