import { isValidKsuid } from "./isValidKsuid.ts";
import { KSUID } from "./ksuid.ts";

/**
 * Compare two KSUID strings
 *
 * @param ksuidString KSUID string to compare
 * @param otherKsuidString KSUID string to compare with
 * @returns `1` if `otherKsuidString` represents an earlier date,
 * `-1` if `otherKsuidString` represents a later date,
 * `0` if they are equal
 */
export function compareKsuids(ksuidString: string, otherKsuidString: string) {
	if (!isValidKsuid(ksuidString) || !isValidKsuid(otherKsuidString)) return 0;

	const ksuid1 = KSUID.parse(ksuidString);
	const ksuid2 = KSUID.parse(otherKsuidString);

	return ksuid1.compare(ksuid2);
}
