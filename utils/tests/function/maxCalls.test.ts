import { decMaxCalls } from "@decorator/decMaxCalls.ts";
import { maxCalls } from "@function/maxCalls.ts";

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

test("decorator", () => {
	class TestClass {
		private count = 0;
		@decMaxCalls(2)
		testMethod() {
			return ++this.count;
		}
	}
	const instance = new TestClass();
	expect(instance.testMethod()).toBe(1);
	expect(instance.testMethod()).toBe(2);
	expect(instance.testMethod()).toBe(2);
});
