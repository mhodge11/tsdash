import { minCalls } from "../src/index.ts";

test("after function works correctly", () => {
	const testFn = vi.fn();
	const afterFn = minCalls(testFn, 2);

	afterFn(1);
	afterFn(1);
	expect(testFn).toHaveBeenCalledTimes(0);

	afterFn(1);
	afterFn(1);
	expect(testFn).toHaveBeenCalledTimes(2);
});
