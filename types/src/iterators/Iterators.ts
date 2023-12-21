export namespace Iterators {
	/**
	 * Create an iterator.
	 *
	 * @param N - Length of the iterator.
	 * @returns An iterator.
	 */

	export type Iterator<N extends number> = IteratorImpl<N>;

	type IteratorImpl<
		N extends number,
		it extends any[] = [],
	> = it["length"] extends N ? it : IteratorImpl<N, [any, ...it]>;

	/**
	 * Get length of an iterator.
	 *
	 * @param it - Iterator to get length of.
	 * @returns Length of the iterator.
	 */

	export type Get<it extends readonly any[]> = it["length"];

	/**
	 * Get the next value of an iterator.
	 *
	 * @param it - Iterator to get next value of.
	 * @returns Next value of the iterator.
	 */

	export type Next<it extends any[]> = [any, ...it];

	/**
	 * Get the previous value of an iterator.
	 *
	 * @param it - Iterator to get previous value of.
	 * @returns Previous value of the iterator.
	 */

	export type Prev<it extends any[]> = it extends readonly [any, ...infer tail]
		? tail
		: [];
}
