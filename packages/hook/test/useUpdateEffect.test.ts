import { renderHook } from "@testing-library/react";
import { useUpdateEffect } from "../src/index.tsx";

const mockEffectCleanup = vi.fn();
const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);

beforeEach(() => {
	vi.clearAllMocks();
});

test("should run effect on update", () => {
	const { rerender } = renderHook(() => useUpdateEffect(mockEffectCallback));
	expect(mockEffectCallback).not.toHaveBeenCalled();

	rerender();
	expect(mockEffectCallback).toHaveBeenCalledTimes(1);
});

test("should run cleanup on unmount", () => {
	const hook = renderHook(() => useUpdateEffect(mockEffectCallback));

	hook.rerender();
	hook.unmount();

	expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
