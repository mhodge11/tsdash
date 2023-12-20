import { chunk } from "@array/chunk.ts";
import { describe, expect, test } from "bun:test";

describe("chunk", () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	test("chunk an array", () => {
		expect(chunk(array, 2)).toEqual([
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
			[9, 10],
		]);
	});

	test("return the last chunk as remaining elements", () => {
		expect(chunk(array, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
	});

	test("coerce `size` to an integer", () => {
		expect(chunk(array, array.length / 4)).toEqual([
			[1, 2],
			[3, 4],
			[5, 6],
			[7, 8],
			[9, 10],
		]);
	});

	test("empty array on negative size", () => {
		expect(chunk(array, -1)).toEqual([]);
	});

	test("empty array", () => {
		expect(chunk([], 2)).toEqual([]);
	});
});
