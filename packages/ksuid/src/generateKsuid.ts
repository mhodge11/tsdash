import { KSUID } from "./ksuid.ts";

/**
 * Generates a new KSUID.
 *
 * @param timestamp (?= Date.now()) A date or timestamp in milliseconds since the epoch
 * @returns A KSUID
 */
export function generateKsuid(timestamp: string | number | Date = Date.now()) {
	return KSUID.random(timestamp).toJSON();
}
