import { crypto } from "@tsdash/internal";

/**
 * A KSUID is a unique identifier that is sortable by the time it was created.
 * It is composed of a timestamp and a payload.
 *
 * @example
 * ```ts
 * const ksuidFromSync = KSUID.random();
 * const idFromSync = ksuidFromSync.string;
 *
 * const ksuidFromAsync = await KSUID.randomAsync();
 * const idFromAsync = ksuidFromAsync.string;
 * ```
 *
 * @see https://github.com/novemberborn/ksuid
 */
export class KSUID {
	/** A string-encoded maximum value for a KSUID */
	static MAX_STRING_ENCODED = "aWgEPTl1tmebfsQzFP4bxwgy80V";
	/** A string-encoded minimum value for a KSUID */
	static MIN_STRING_ENCODED = "000000000000000000000000000";

	private view: DataView;

	/**
	 * Creates a new KSUID from an ArrayBufferLike.
	 *
	 * @param buffer An ArrayBufferLike containing a KSUID
	 */
	constructor(buffer: ArrayBufferLike) {
		if (!KSUID.isValid(buffer)) throw new TypeError(VALID_BUFFER_ASSERTION);
		this.view = new DataView(buffer);
	}

	/**
	 * A copy of the underlying buffer.
	 */
	get raw() {
		return this.view.buffer.slice(0);
	}

	/**
	 * The byte length of the KSUID.
	 */
	get length() {
		return new Uint8Array(this.view.buffer).length;
	}

	/**
	 * The date the KSUID was created.
	 */
	get date() {
		return new Date(1e3 * this.timestamp + EPOCH_IN_MS);
	}

	/**
	 * The timestamp of the KSUID in milliseconds since the epoch.
	 */
	get timestamp() {
		return this.view.getUint32(0, false);
	}

	/**
	 * The payload of the KSUID.
	 */
	get payload() {
		return this.view.buffer.slice(TIMESTAMP_BYTE_LENGTH, BYTE_LENGTH);
	}

	/**
	 * The KSUID as a string.
	 */
	get string() {
		return base62(this.view, STRING_ENCODED_LENGTH).padStart(
			STRING_ENCODED_LENGTH,
			"0",
		);
	}

	/**
	 * The KSUID tag.
	 */
	get [Symbol.toStringTag]() {
		return "KSUID";
	}

	/**
	 * Compares this KSUID to another.
	 *
	 * @param other KSUID to compare to
	 * @returns `1` if `other` represents an earlier date,
	 * `-1` if `other` represents a later date,
	 * `0` if they are equal
	 */
	compare(other: KSUID) {
		if (!(other instanceof KSUID) || this === other) return 0;

		const a = new Uint8Array(this.view.buffer);
		const b = new Uint8Array(other.view.buffer);

		for (let offset = 0; offset < a.length; offset++) {
			// biome-ignore lint/style/noNonNullAssertion: This will always be defined
			if (a[offset]! < b[offset]!) return -1;
			// biome-ignore lint/style/noNonNullAssertion: This will always be defined
			if (a[offset]! > b[offset]!) return 1;
		}

		return 0;
	}

	/**
	 * Checks if this KSUID is equal to another.
	 *
	 * @param other KSUID to compare to
	 * @returns `true` if they are equal, `false` otherwise
	 */
	equals(other: KSUID) {
		return this.compare(other) === 0;
	}

	/**
	 * Converts the KSUID to a string used by `JSON.stringify()`.
	 *
	 * @returns The KSUID as a string
	 */
	toJSON() {
		return this.string;
	}

	/**
	 * Converts the KSUID to a string used for representation.
	 *
	 * @returns The KSUID as a string
	 */
	toString() {
		return `${this[Symbol.toStringTag]} { ${this.string} }`;
	}

	/**
	 * Generates a new KSUID.
	 *
	 * @param timestamp (?= Date.now()) A date or timestamp in milliseconds since the epoch
	 * @returns A KSUID
	 */
	static random(timestamp: string | number | Date = Date.now()) {
		return new KSUID(fromParts(timestamp, randomBytes()));
	}

	/**
	 * Generates a new KSUID asynchronously.
	 *
	 * @param timestamp (?= Date.now()) A date or timestamp in milliseconds since the epoch
	 * @returns A KSUID
	 */
	static async randomAsync(timestamp: string | number | Date = Date.now()) {
		return KSUID.random(timestamp);
	}

	/**
	 * Generates a new KSUID with a custom payload.
	 *
	 * @param timestamp (?= Date.now()) A timestamp in milliseconds since the epoch
	 * @param payload A Uint8Array of length 16 that randomizes the KSUID
	 * @returns A KSUID
	 */
	static fromParts(timestamp: string | number | Date, payload: Uint8Array) {
		timestamp = new Date(timestamp).getTime();

		if (
			!Number.isInteger(timestamp) ||
			timestamp < EPOCH_IN_MS ||
			timestamp > MAX_TIME_IN_MS
		)
			throw new TypeError(TIME_IN_MS_ASSERTION);

		if (!Buffer.isBuffer(payload) || payload.byteLength !== PAYLOAD_BYTE_LENGTH)
			throw new TypeError(VALID_PAYLOAD_ASSERTION);

		return new KSUID(fromParts(timestamp, payload));
	}

	/**
	 * Checks if a buffer is a valid KSUID.
	 *
	 * @param buffer A possible KSUID buffer
	 * @returns `true` if the buffer is a valid KSUID, `false` otherwise
	 */
	static isValid(buffer: ArrayBufferLike) {
		return buffer.byteLength === BYTE_LENGTH;
	}

	/**
	 * Parses a string-encoded KSUID.
	 *
	 * @param data A string-encoded KSUID
	 * @returns A KSUID
	 */
	static parse(data: string) {
		if (data.length !== STRING_ENCODED_LENGTH)
			throw new TypeError(VALID_ENCODING_ASSERTION);

		const decoded = debase62(data, BYTE_LENGTH);
		if (decoded.byteLength === BYTE_LENGTH) return new KSUID(decoded);

		const buffer = new ArrayBuffer(BYTE_LENGTH);
		const dstView = new DataView(buffer);
		const srcView = new DataView(decoded);

		const padEnd = BYTE_LENGTH - decoded.byteLength;
		for (let offset = 0; offset < padEnd; offset++) dstView.setUint8(offset, 0);

		for (let offset = padEnd; offset < BYTE_LENGTH; offset++)
			dstView.setUint8(offset, srcView.getUint8(offset - padEnd));

		return new KSUID(buffer);
	}
}

const EPOCH_IN_MS = 14e11;

const MAX_TIME_IN_MS = 1e3 * (2 ** 32 - 1) + EPOCH_IN_MS;

// Timestamp is a uint32
const TIMESTAMP_BYTE_LENGTH = 4;

// Payload is 16-bytes
const PAYLOAD_BYTE_LENGTH = 16;

// KSUIDs are 20 bytes when binary encoded
const BYTE_LENGTH = TIMESTAMP_BYTE_LENGTH + PAYLOAD_BYTE_LENGTH;

// The length of a KSUID when string (base62) encoded
const STRING_ENCODED_LENGTH = 27;

const TIME_IN_MS_ASSERTION =
	`Valid KSUID timestamps must be in milliseconds since ${new Date(
		0,
	).toISOString()},
  no earlier than ${new Date(
		EPOCH_IN_MS,
	).toISOString()} and no later than ${new Date(MAX_TIME_IN_MS).toISOString()}
`
		.trim()
		.replace(/(\n|\s)+/g, " ")
		.replace(/\.000Z/g, "Z");

const VALID_ENCODING_ASSERTION = `Valid encoded KSUIDs are ${STRING_ENCODED_LENGTH} characters`;

const VALID_BUFFER_ASSERTION = `Valid KSUID buffers are ${BYTE_LENGTH} bytes`;

const VALID_PAYLOAD_ASSERTION = `Valid KSUID payloads are ${PAYLOAD_BYTE_LENGTH} bytes`;

function randomBytes(): Uint8Array {
	return crypto.getRandomValues(new Uint8Array(16));
}

function fromParts(timestamp: string | number | Date, payload: Uint8Array) {
	const buffer = new ArrayBuffer(BYTE_LENGTH);
	const view = new DataView(buffer);

	timestamp = new Date(timestamp).getTime();
	const timestampEpoch = Math.floor((timestamp - EPOCH_IN_MS) / 1e3);
	view.setUint32(0, timestampEpoch, false);

	let offset = TIMESTAMP_BYTE_LENGTH;
	for (const byte of payload) {
		view.setUint8(offset, byte);
		offset++;
	}

	return view.buffer;
}

/**
 * Converts arrays of integers from one base to another. Uses an O(N²) algorithm.
 *
 * Solution from package `base-convert-int-array` by GitHub user `novemberborn`.
 *
 * @see https://github.com/novemberborn/base-convert-int-array
 */

function baseConvertIntArray(
	array: number[],
	{
		from,
		to,
		fixedLength,
	}: { from: number; to: number; fixedLength?: number | undefined },
): number[] {
	let length = fixedLength;
	if (typeof length === "undefined") length = maxLength(array, from, to);
	const result = new Array(length);

	// Each iteration prepends the resulting value, so start the offset at the end.
	let offset = length;
	let input = array;
	while (input.length > 0) {
		if (offset === 0)
			throw new RangeError(
				`Fixed length of ${fixedLength} is too small, expected at least ${maxLength(
					array,
					from,
					to,
				)}`,
			);

		const quotients: number[] = [];
		let remainder = 0;
		for (const digit of input) {
			const acc = digit + remainder * from;
			const q = Math.floor(acc / to);
			remainder = acc % to;

			if (quotients.length > 0 || q > 0) quotients.push(q);
		}

		result[--offset] = remainder;
		input = quotients;
	}

	// Trim leading padding, unless length is fixed.
	if (typeof fixedLength === "undefined")
		return offset > 0 ? result.slice(offset) : result;

	// Fill in any holes in the result array.
	while (offset > 0) result[--offset] = 0;
	return result;
}

function maxLength(array: number[], from: number, to: number) {
	return Math.ceil((array.length * Math.log2(from)) / Math.log2(to));
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function base62(view: DataView, fixedLength?: number): string {
	const numbs: number[] = new Array(view.byteLength);

	for (let offset = 0; offset < view.byteLength; offset++)
		numbs[offset] = view.getUint8(offset);

	return baseConvertIntArray(numbs, { from: 256, to: 62, fixedLength })
		.map((value: number) => BASE62[value])
		.join("");
}

/**
 * @see https://github.com/novemberborn/ksuid/blob/90ca4c1508f216e03923de610291786a0d6a868c/base62.js#L13C40-L21C85
 */

export function debase62(data: string, fixedLength?: number) {
	const input = Array.from(data, (char) => {
		const charCode = char.charCodeAt(0);
		if (charCode < 58) return charCode - 48;
		if (charCode < 91) return charCode - 55;
		return charCode - 61;
	});

	return new Uint8Array(
		baseConvertIntArray(input, { from: 62, to: 256, fixedLength }),
	).buffer;
}
