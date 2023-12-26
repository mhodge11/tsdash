import { useCallback } from "react";

import { useMountedState } from "./useMountedState.tsx";

export function usePromise() {
	const isMounted = useMountedState();
	// biome-ignore lint/correctness/useExhaustiveDependencies: isMounted is a ref
	return useCallback<<T>(promise: Promise<T>) => Promise<T>>(
		(promise) =>
			new Promise((resolve, reject) => {
				const onValue = (value: any) => isMounted() && resolve(value);
				const onError = (error: any) => isMounted() && reject(error);
				promise.then(onValue, onError);
			}),
		[],
	);
}
