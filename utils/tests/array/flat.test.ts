import { flat } from "@array/flat.ts";

test("flattens an array of arrays", () => {
	expect(flat([[2], [3], [4, 5], [6, 7, 8], [9]])).toEqual([
		2, 3, 4, 5, 6, 7, 8, 9,
	]);
});

test("flattens an array of arrays of arrays", () => {
	expect(flat([[[2], [3]], [[4, 5]], [[6, 7, 8]], [[9]]])).toEqual([
		[2], [3], [4, 5], [6, 7, 8], [9],
	]);
});
