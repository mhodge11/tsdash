import { renderHook } from "@testing-library/react";
import { isEqual } from "@tsdash/validate";
import { useEffect } from "react";
import { useCompareEffect } from "../src/index.tsx";

let options = { max: 10 };
let options1 = { max: 10, range: { from: 0, to: 10 } };
const options2 = { max: 10, range: { from: 0, to: 10 } };

const mockEffectNormal = vi.fn();
const mockEffectShallow = vi.fn();
const mockEffectDeep = vi.fn();
const mockEffectCleanup = vi.fn();
const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);

beforeEach(() => {
	vi.clearAllMocks();
});

test("should shallow compare dependencies", () => {
	const { rerender: rerenderNormal } = renderHook(() =>
		// biome-ignore lint/correctness/useExhaustiveDependencies: For testing
		useEffect(mockEffectNormal, [options1, options2]),
	);
	const { rerender: rerenderShallow } = renderHook(() =>
		useCompareEffect(mockEffectShallow, [options1, options2], "shallow"),
	);

	expect(mockEffectNormal).toHaveBeenCalledTimes(1);
	expect(mockEffectShallow).toHaveBeenCalledTimes(1);

	options1 = { max: 10, range: options1.range };
	rerenderShallow();
	rerenderNormal();

	expect(mockEffectNormal).toHaveBeenCalledTimes(2);
	expect(mockEffectShallow).toHaveBeenCalledTimes(1);

	options1 = { max: 10, range: { from: 0, to: 10 } };
	rerenderNormal();
	rerenderShallow();

	expect(mockEffectNormal).toHaveBeenCalledTimes(3);
	expect(mockEffectShallow).toHaveBeenCalledTimes(2);
});

test("should run clean-up provided on unmount with shallow comparison", () => {
	const { unmount } = renderHook(() =>
		useCompareEffect(mockEffectCallback, [options1, options2], "shallow"),
	);
	expect(mockEffectCleanup).not.toHaveBeenCalled();

	unmount();
	expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});

test("should deep compare dependencies", () => {
	const { rerender: rerenderNormal } = renderHook(() =>
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(mockEffectNormal, [options]),
	);
	const { rerender: rerenderDeep } = renderHook(() =>
		useCompareEffect(mockEffectDeep, [options]),
	);

	expect(mockEffectNormal).toHaveBeenCalledTimes(1);
	expect(mockEffectDeep).toHaveBeenCalledTimes(1);

	options = { max: 10 };
	rerenderDeep();
	rerenderNormal();

	expect(mockEffectNormal).toHaveBeenCalledTimes(2);
	expect(mockEffectDeep).toHaveBeenCalledTimes(1);

	options = { max: 10 };
	rerenderNormal();
	rerenderDeep();

	expect(mockEffectNormal).toHaveBeenCalledTimes(3);
	expect(mockEffectDeep).toHaveBeenCalledTimes(1);
});

test("should run clean-up provided on unmount with deep comparison", () => {
	const { unmount } = renderHook(() =>
		useCompareEffect(mockEffectCallback, [options]),
	);
	expect(mockEffectCleanup).not.toHaveBeenCalled();

	unmount();
	expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});

test("should run provided object once with custom function", () => {
	const { rerender: rerenderNormal } = renderHook(() =>
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(mockEffectNormal, [options]),
	);
	const { rerender: rerenderDeep } = renderHook(() =>
		useCompareEffect(mockEffectDeep, [options], isEqual),
	);

	expect(mockEffectNormal).toHaveBeenCalledTimes(1);
	expect(mockEffectDeep).toHaveBeenCalledTimes(1);

	options = { max: 10 };
	rerenderDeep();
	rerenderNormal();

	expect(mockEffectNormal).toHaveBeenCalledTimes(2);
	expect(mockEffectDeep).toHaveBeenCalledTimes(1);

	options = { max: 10 };
	rerenderNormal();
	rerenderDeep();

	expect(mockEffectNormal).toHaveBeenCalledTimes(3);
	expect(mockEffectDeep).toHaveBeenCalledTimes(1);
});

test("should run clean-up provided on unmount with custom function", () => {
	const { unmount } = renderHook(() =>
		useCompareEffect(mockEffectCallback, [options], isEqual),
	);
	expect(mockEffectCleanup).not.toHaveBeenCalled();

	unmount();
	expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});

test("warn if dependencies are not provided correctly", () => {
	const spy = vi.spyOn(console, "warn");
	let deps: any[] | undefined = [];

	const { rerender } = renderHook(() =>
		// @ts-expect-error - Testing invalid deps
		useCompareEffect(mockEffectNormal, deps),
	);
	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy).toHaveBeenCalledWith(
		"`useCompareEffect` should not be used with no dependencies. Use React.useEffect instead.",
	);
	spy.mockClear();

	deps = undefined;

	rerender();
	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy).toHaveBeenCalledWith(
		"`useCompareEffect` should not be used with no dependencies. Use React.useEffect instead.",
	);
});

test("warn if dependencies are all primitives", () => {
	const spy = vi.spyOn(console, "warn");
	const deps: any[] = [1, "2", true, null, undefined, Symbol("3")];

	renderHook(() => useCompareEffect(mockEffectNormal, deps));
	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy).toHaveBeenCalledWith(
		"`useCompareEffect` should not be used with only primitive dependencies. Use React.useEffect instead.",
	);
});

test("warn if comparison function is not valid", () => {
	const spy = vi.spyOn(console, "warn");

	renderHook(() =>
		// @ts-expect-error - Testing invalid comparison function
		useCompareEffect(mockEffectNormal, [{ test: "test" }], "invalid"),
	);
	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy).toHaveBeenCalledWith(
		"`useCustomCompareEffect` should be used with `deep`, `shallow`, or a depsEqual callback for comparing deps list.",
	);
});
