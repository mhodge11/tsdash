import { useEffectOnce } from "./useEffectOnce.tsx";
import { useUpdateEffect } from "./useUpdateEffect.tsx";

export function useLogger(componentName: string, ...rest: any[]) {
	useEffectOnce(() => {
		console.log(`${componentName} mounted`, ...rest);
		return () => console.log(`${componentName} unmounted`);
	});
	useUpdateEffect(() => {
		console.log(`${componentName} updated`, ...rest);
	});
}
