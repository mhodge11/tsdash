import { maxCalls } from "../src/index.ts";

test("only calls 3 times", () => {
	const testFn = vi.fn();
	const beforeFn = maxCalls(testFn, 3);

	beforeFn();
	beforeFn();
	expect(testFn).toHaveBeenCalledTimes(2);

	beforeFn();
	beforeFn();
	expect(testFn).toHaveBeenCalledTimes(3);
});
