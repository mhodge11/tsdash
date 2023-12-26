import { renderHook } from "@testing-library/react";
import { useUnmount } from "../src/index.tsx";

const spy = vi.fn();
const spy2 = vi.fn();
const spy3 = vi.fn();

beforeEach(() => {
	vi.clearAllMocks();
});

test("should be defined", () => {
	expect(useUnmount).toBeDefined();
});

test("should not call provided callback on mount", () => {
	renderHook(() => useUnmount(spy));

	expect(spy).not.toHaveBeenCalled();
});

test("should not call provided callback on re-renders", () => {
	const hook = renderHook(() => useUnmount(spy));

	hook.rerender();
	hook.rerender();
	hook.rerender();
	hook.rerender();

	expect(spy).not.toHaveBeenCalled();
});

test("should call provided callback on unmount", () => {
	const hook = renderHook(() => useUnmount(spy));

	hook.unmount();

	expect(spy).toHaveBeenCalledTimes(1);
});

test("should call multiple provided callbacks on unmount", () => {
	const hook = renderHook(() => useUnmount(spy, spy2, spy3));

	hook.unmount();

	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy2).toHaveBeenCalledTimes(1);
	expect(spy3).toHaveBeenCalledTimes(1);
});

test("should call provided callback if is has been changed", () => {
	const hook = renderHook((cb) => useUnmount(cb), { initialProps: spy });

	hook.rerender(spy2);
	hook.rerender(spy3);
	hook.unmount();

	expect(spy).not.toHaveBeenCalled();
	expect(spy2).not.toHaveBeenCalled();
	expect(spy3).toHaveBeenCalledTimes(1);
});
