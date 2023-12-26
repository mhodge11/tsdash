import { useRef } from "react";

/**
 * Determines if the component is being rendered for the first time.
 *
 * @returns `true` on the first render and `false` on subsequent renders.
 */
export function useIsFirstMount(): boolean {
	const isFirst = useRef(true);

	if (isFirst.current) {
		isFirst.current = false;
		return true;
	}

	return isFirst.current;
}
