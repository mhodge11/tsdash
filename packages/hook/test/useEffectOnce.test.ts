import { renderHook } from "@testing-library/react";
import { useEffectOnce } from "../src/index.tsx";

const mockEffectCleanup = vi.fn();
const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);

beforeEach(() => {
	vi.clearAllMocks();
});

test("should run provided effect only once", () => {
	const { rerender } = renderHook(() => useEffectOnce(mockEffectCallback));
	expect(mockEffectCallback).toHaveBeenCalledTimes(1);

	rerender();
	expect(mockEffectCallback).toHaveBeenCalledTimes(1);
});

test("should run clean-up provided on unmount", () => {
	const { unmount } = renderHook(() => useEffectOnce(mockEffectCallback));
	expect(mockEffectCleanup).not.toHaveBeenCalled();

	unmount();
	expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
