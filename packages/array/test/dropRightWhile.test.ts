import { dropRightWhile } from "../src/index.ts";

const array = [2, 4, 5, 6];

test("drop elements while `predicate` returns truthy", () => {
	expect(dropRightWhile(array, (n) => n > 4)).toEqual([2, 4]);
});
