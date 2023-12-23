import type { GenericFunction } from "@tsdash/function";

/**
 * Transforms a function into a decorator function.
 *
 * @example
 * ```typescript
 * function log(func: Function, message: string) {
 *   return function (...args: unknown[]) {
 *     console.log(message);
 *     return func(...args);
 *   };
 * }
 *
 * const logger = toDecorator(log);
 *
 * class TestClass {
 *   @logger("Hello world!")
 *   testMethod() {
 *     return 1;
 *   }
 * }
 *
 * const instance = new TestClass();
 * instance.testMethod();
 * // => Log "Hello World" and return 1
 * ```
 *
 * @param func The function to transform
 * @template T The type of the function
 * @returns A decorator function that can be used to decorate a method
 */

export function toDecorator<T extends GenericFunction<T>>(func: T) {
	return (...args: Tail<Parameters<T>>) =>
		(_target: unknown, _key: string, descriptor: PropertyDescriptor) => {
			const creatorArgs = [descriptor.value, ...args] as Parameters<T>;
			descriptor.value = func(...creatorArgs);
		};
}

type Tail<T extends unknown[]> = T extends [infer _H, ...infer T] ? T : never;
