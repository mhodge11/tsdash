/**
 * Special function for never because `Equal<T, never>` doesn't
 * work when called deep in the call stack (for a reason I don't understand
 * probably a TS bug).
 * @param T - Type to check
 * @returns `true` if type is `never`, else `false`
 */

export type IsNever<T> = [T] extends [never] ? true : false;
