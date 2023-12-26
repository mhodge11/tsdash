import { useCallback, useEffect, useRef } from "react";

/**
 * Determines if the component is mounted or not.
 *
 * @returns a function that returns `true` on the first render and `false` on subsequent renders.
 */
export function useMountedState() {
	const mountedRef = useRef(false);
	const get = useCallback(() => mountedRef.current, []);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	return get;
}
