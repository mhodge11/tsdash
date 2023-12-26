import { renderHook } from "@testing-library/react";
import { useMount } from "../src/index.tsx";

const spy = vi.fn();
const spy2 = vi.fn();
const spy3 = vi.fn();

beforeEach(() => {
	vi.clearAllMocks();
});

test("should call provided callback on mount", () => {
	renderHook(() => useMount(spy));

	expect(spy).toHaveBeenCalledTimes(1);
});

test("should call multiple provided callbacks on mount", () => {
	renderHook(() => useMount(spy, spy2, spy3));

	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy2).toHaveBeenCalledTimes(1);
	expect(spy3).toHaveBeenCalledTimes(1);
});

test("should not call provided callback on unmount", () => {
	const { unmount } = renderHook(() => useMount(spy));
	expect(spy).toHaveBeenCalledTimes(1);

	unmount();

	expect(spy).toHaveBeenCalledTimes(1);
});

test("should not call provided callback on rerender", () => {
	const { rerender } = renderHook(() => useMount(spy));
	expect(spy).toHaveBeenCalledTimes(1);

	rerender();

	expect(spy).toHaveBeenCalledTimes(1);
});
