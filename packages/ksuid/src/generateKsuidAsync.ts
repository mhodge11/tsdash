import { KSUID } from "./ksuid.ts";

/**
 * Asynchronously generates a new KSUID.
 *
 * @param timestamp (?= Date.now()) A date or timestamp in milliseconds since the epoch
 * @returns A KSUID
 */
export async function generateKsuidAsync(
	timestamp: string | number | Date = Date.now(),
) {
	return (await KSUID.randomAsync(timestamp)).toJSON();
}
