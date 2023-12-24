import { crypto } from "@tsdash/internal";

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// Same as in non-secure/index.js
export const uuidUrlAlphabet =
	"useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// It is best to make fewer, larger requests to the crypto module to
// avoid system call overhead. So, random numbers are generated in a
// pool. The pool is a Buffer that is larger than the initial random
// request size by this multiplier. The pool is enlarged if subsequent
// requests exceed the maximum buffer size.
const POOL_SIZE_MULTIPLIER = 128;
let pool: Buffer;
let poolOffset: number;

function fillPool(bytes: number) {
	if (!pool || pool.length < bytes) {
		pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
		crypto.getRandomValues(pool);
		poolOffset = 0;
	} else if (poolOffset + bytes > pool.length) {
		crypto.getRandomValues(pool);
		poolOffset = 0;
	}

	poolOffset += bytes;
}

function random(bytes: number) {
	// `-=` convert `bytes` to number to prevent `valueOf` abusing
	fillPool((bytes -= 0));
	return pool.subarray(poolOffset - bytes, poolOffset);
}

/**
 * Generates a UUID using a custom alphabet.
 *
 * @param alphabet Custom alphabet to generate the UUID from.
 * @param defaultSize Default size of the UUID.
 * @returns A function that generates a UUID.
 */
export function generateCustomUuid(alphabet: string, defaultSize = 21) {
	// First, a bitmask is necessary to generate the ID. The bitmask makes bytes
	// values closer to the alphabet size. The bitmask calculates the closest
	// `2^31 - 1` number, which exceeds the alphabet size.
	// For example, the bitmask for the alphabet size 30 is 31 (00011111).
	const mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1;
	// Though, the bitmask solution is not perfect since the bytes exceeding
	// the alphabet size are refused. Therefore, to reliably generate the ID,
	// the random bytes redundancy has to be satisfied.

	// Note: every hardware random generator call is performance expensive,
	// because the system call for entropy collection takes a lot of time.
	// So, to avoid additional system calls, extra bytes are requested in advance.

	// Next, a step determines how many random bytes to generate.
	// The number of random bytes gets decided upon the ID size, mask,
	// alphabet size, and magic number 1.6 (using 1.6 peaks at performance
	// according to benchmarks).
	const step = Math.ceil((1.6 * mask * defaultSize) / alphabet.length);

	return (size = defaultSize) => {
		let id = "";
		while (true) {
			const bytes = random(step);
			// A compact alternative for `for (let i = 0; i < step; i++)`.
			let i = step;
			while (i--) {
				// Adding `|| ''` refuses a random byte that exceeds the alphabet size.
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				id += alphabet[bytes[i]! & mask] || "";
				if (id.length === size) return id;
			}
		}
	};
}

/**
 * Generates a UUID.
 *
 * @param size Size of the UUID.
 * @returns A UUID.
 */
export function generateUuid(size = 21) {
	// `-=` convert `size` to number to prevent `valueOf` abusing
	fillPool((size -= 0));
	let id = "";
	// We are reading directly from the random pool to avoid creating new array
	for (let i = poolOffset - size; i < poolOffset; i++) {
		// It is incorrect to use bytes exceeding the alphabet size.
		// The following mask reduces the random byte in the 0-255 value
		// range to the 0-63 value range. Therefore, adding hacks, such
		// as empty string fallback or magic numbers, is unnecessary because
		// the bitmask trims bytes down to the alphabet size.
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		id += uuidUrlAlphabet[pool[i]! & 63];
	}
	return id;
}

/**
 * Asynchronously generates a UUID using a custom alphabet.
 *
 * @param alphabet Custom alphabet to generate the UUID from.
 * @param defaultSize Default size of the UUID.
 * @returns A promise resolving to a function that generates a UUID.
 */
export async function generateCustomUuidAsync(
	alphabet: string,
	defaultSize = 21,
) {
	return generateCustomUuid(alphabet, defaultSize);
}

/**
 * Asynchronously generates a UUID.
 *
 * @param size Size of the UUID.
 * @returns A promise resolving to UUID.
 */
export async function generateUuidAsync(size = 21) {
	return generateUuid(size);
}
