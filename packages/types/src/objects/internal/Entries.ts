import type { Keys } from "./Keys.ts";

export type Entries<T> = Keys<T> extends infer keys extends keyof T
	? {
			[K in keys]: [K, T[K]];
	  }[keys]
	: never;
