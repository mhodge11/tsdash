import { isEqual } from "@tsdash/validate";
import {
	type DependencyList,
	type EffectCallback,
	useEffect,
	useRef,
} from "react";

type DepsEqualFnType<TDeps extends DependencyList> = (
	prevDeps: TDeps,
	nextDeps: TDeps,
) => boolean;

type DepsEqualTypeOrFnType<TDeps extends DependencyList> =
	| "deep"
	| "shallow"
	| DepsEqualFnType<TDeps>;

/**
 * Runs a useEffect callback only if the dependencies have changed based on a
 * deep or shallow comparison, or based on a custom comparison function.
 *
 * @param effect The effect callback to run.
 * @param deps The dependencies to watch for changes.
 * @param depsEqualTypeOrFn `deep`, `shallow`, or a custom function to compare
 * the dependencies.
 */
export function useCompareEffect<TDeps extends DependencyList>(
	effect: EffectCallback,
	deps: TDeps,
	depsEqualTypeOrFn: DepsEqualTypeOrFnType<TDeps> = "deep",
) {
	warn(deps, depsEqualTypeOrFn);

	const ref = useRef<TDeps | undefined>(undefined);

	let depsEqual: DepsEqualFnType<TDeps>;
	if (typeof depsEqualTypeOrFn === "function") depsEqual = depsEqualTypeOrFn;
	else if (depsEqualTypeOrFn === "deep") depsEqual = isDeepEqual;
	else depsEqual = isShallowEqual;

	if (!ref.current || !depsEqual(deps, ref.current)) ref.current = deps;

	useEffect(effect, ref.current);
}

function isDeepEqual<TDeps extends DependencyList>(
	prevDeps: TDeps,
	nextDeps: TDeps,
) {
	if (!prevDeps || !nextDeps) return false;
	if (prevDeps.length !== nextDeps.length) return false;

	return prevDeps.every((dep) => deepCompare(dep, nextDeps));
}

function deepCompare<TDeps extends DependencyList>(
	prevDep: TDeps[number],
	nextDeps: TDeps,
) {
	return nextDeps.find((dep) => isEqual(prevDep, dep));
}

function isShallowEqual<TDeps extends DependencyList>(
	prevDeps: TDeps,
	nextDeps: TDeps,
) {
	return prevDeps.every((dep, index) => shallowCompare(dep, nextDeps[index]));
}

function shallowCompare<TDep extends DependencyList[number]>(
	prevDep: TDep,
	nextDep: TDep,
) {
	if (prevDep === nextDep) return true;
	if (
		!(prevDep instanceof Object) ||
		!(nextDep instanceof Object) ||
		Object.keys(prevDep).length !== Object.keys(nextDep).length
	)
		return false;

	if (!Array.isArray(prevDep) || !Array.isArray(nextDep))
		for (const key in prevDep) if (!(key in nextDep)) return false;
	for (const key in prevDep)
		if (
			(prevDep as Record<string, any>)[key] !==
			(nextDep as Record<string, any>)[key]
		)
			return false;

	return Object.keys(prevDep).length === Object.keys(nextDep).length;
}

function warn<TDeps extends DependencyList>(
	deps: TDeps,
	depsEqualTypeOrFn: DepsEqualTypeOrFnType<TDeps>,
) {
	// biome-ignore lint/complexity/useLiteralKeys: this is a warning function
	if (process.env["NODE_ENV"] === "production") return;

	if (!Array.isArray(deps) || !deps.length)
		return console.warn(
			"`useCompareEffect` should not be used with no dependencies. Use React.useEffect instead.",
		);

	if (deps.every(isPrimitive))
		return console.warn(
			"`useCompareEffect` should not be used with only primitive dependencies. Use React.useEffect instead.",
		);

	if (
		typeof depsEqualTypeOrFn !== "function" &&
		depsEqualTypeOrFn !== "deep" &&
		depsEqualTypeOrFn !== "shallow"
	)
		console.warn(
			"`useCustomCompareEffect` should be used with `deep`, `shallow`, or a depsEqual callback for comparing deps list.",
		);
}

function isPrimitive(dep: any) {
	return dep !== Object(dep);
}
