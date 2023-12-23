[@tsdash/function](README.md) / Exports

# @tsdash/function

## Table of contents

### Type Aliases

- [GenericFunction](modules.md#genericfunction)

### Functions

- [debounce](modules.md#debounce)
- [fuzzySearch](modules.md#fuzzysearch)
- [maxCalls](modules.md#maxcalls)
- [memoize](modules.md#memoize)
- [minCalls](modules.md#mincalls)
- [simpleFuzzySearch](modules.md#simplefuzzysearch)
- [throttle](modules.md#throttle)
- [times](modules.md#times)

## Type Aliases

### GenericFunction

Ƭ **GenericFunction**\<`F`\>: (...`args`: `Parameters`\<`F`\>) => `ReturnType`\<`F`\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `F` | extends (...`args`: `any`) => `any` | The type of the function |

#### Type declaration

▸ (`...args`): `ReturnType`\<`F`\>

This type builds a generic function.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`\<`F`\> |

##### Returns

`ReturnType`\<`F`\>

**`Example`**

```typescript
function foo<
  F extends GenericFunction<F>
>(fn: F): F & { bar: () => void; } {
  const foo = function (
    this: unknown,
    ...args: Parameters<TFunc>
  ) {
    return fn.apply(this, args);
  }

  foo.bar = function () {
    console.log("bar");
  }

  return foo as F & { bar: () => void; };
}
```

#### Defined in

[types/GenericFunction.ts:27](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/types/GenericFunction.ts#L27)

## Functions

### debounce

▸ **debounce**\<`T`\>(`func`, `wait`): `T` & \{ `cancel`: () => `void` ; `flush`: () => `void` ; `pending`: () => `boolean`  }

Creates a debounced version of a function. Only calling it after a specified amount of time has passed without any new calls.

**Methods:**
- `cancel()` will cancel the next invocation of the debounced function.
- `flush()` will immediately invoke the debounced function and cancel any pending invocations.
- `pending()` returns true if the debounced function is set to invoke.

This function can be used as a decorator with decDebounce.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`GenericFunction`](modules.md#genericfunction)\<`T`\> | The type of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | The function to debounce |
| `wait` | `number` | The number of milliseconds to wait before invoking `func` |

#### Returns

`T` & \{ `cancel`: () => `void` ; `flush`: () => `void` ; `pending`: () => `boolean`  }

A debounced version of `func` with `cancel` and `flush` methods

**`Example`**

```typescript
const sayHello = (name: string) => console.log(`Hello, ${name}!`);
const debouncedSayHello = debounce(sayHello, 200);

debouncedSayHello("John");
debouncedSayHello("Jane");
// => Only the second invocation of `debouncedSayHello` is executed, after a delay of 200ms.
```

#### Defined in

[debounce.ts:29](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/debounce.ts#L29)

___

### fuzzySearch

▸ **fuzzySearch**\<`T`\>(`...args`): `Result`[]

Fuzzy search an array of strings.
It uses a scoring system to determine the best matches.
The best matches are returned first.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] = `string`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `FuzzySearchArgs`\<`T`\> |

#### Returns

`Result`[]

An array of matches

#### Defined in

[fuzzySearch.ts:14](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/fuzzySearch.ts#L14)

___

### maxCalls

▸ **maxCalls**\<`T`\>(`func`, `n`): `T`

Creates a function that invokes the given function as long as it's called `<= n` times.

Subsequent calls to the created function return the result of the last `func` invocation.

This function can be used as a decorator with decMaxCalls.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`GenericFunction`](modules.md#genericfunction)\<`T`\> | The type of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | The function to restrict |
| `n` | `number` | The number of calls before the cached result is returned |

#### Returns

`T`

Returns the new restricted function

**`Example`**

```typescript
let count = 0;
const addCount = () => ++count;

// Allow addCount to be invoked twice.
const limitAddCount = maxCalls(addCount, 2)

limitAddCount() // => 1
limitAddCount() // => 2
limitAddCount() // => 2
// => `limitAddCount` is invoked twice and the result is cached.
```

#### Defined in

[maxCalls.ts:30](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/maxCalls.ts#L30)

___

### memoize

▸ **memoize**\<`T`, `C`\>(`func`, `options?`): `T` & \{ `cache`: `C`  }

Creates a function that memoizes the result of a given function.

The cache key is determined by the `resolver` or by the arguments from the function call.

**Options:**
- `resolver` A function that determines the cache key based on the arguments provided.
- `ttl` the time to live for the cache entries in milliseconds.

**Properties:**
- `cache` The cache is an instance of `Map` and can be used to clear or inspect the cache.
It can be replaced by a custom cache that matches the `Map` interface.

This function can be used as a decorator with decMemoize.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`GenericFunction`](modules.md#genericfunction)\<`T`\> | The type of the function to memoize. |
| `C` | extends `Map`\<`string`, [`ReturnType`\<`T`\>, `number`]\> | The type of the cache storage |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | The function to have its output memoized |
| `options` | `Object` | The options object with optional `resolver` and `ttl` parameters |
| `options.resolver?` | (...`args`: `Parameters`\<`T`\>) => `string` | A function that determines the cache key for storing the result based on the arguments provided |
| `options.ttl?` | `number` | The time to live for the cache in milliseconds |

#### Returns

`T` & \{ `cache`: `C`  }

Returns the new memoized function

**`Example`**

```typescript
function fibonacci(n: number) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci, { ttl: 1000 })

memoizedFib(40) // => 102334155
memoizedFib(40) // => 102334155 (cache hit)
setTimeout(() => memoizedFib(40), 1000) // => 102334155 (cache miss)

// Cached values are exposed as the `cache` property.
memoizedFib.cache.get("40") // => [value, timestamp]
memoizedFib.cache.set("40", [1234, Date.now()])
memoizedFib.cache.clear()

// This is the default way to create cache keys.
const defaultResolver = (...args: unknown[]) => JSON.stringify(args)
```

#### Defined in

[memoize.ts:49](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/memoize.ts#L49)

___

### minCalls

▸ **minCalls**\<`T`\>(`func`, `n`): (`this`: `unknown`, ...`args`: `Parameters`\<`T`\>) => `void` \| `ReturnType`\<`T`\>

Creates a function that invokes the given function once it's called more than `n` times.
Returns undefined until the minimum call count is reached.

This function can be used as a decorator with decMinCalls.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`GenericFunction`](modules.md#genericfunction)\<`T`\> | The type of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | The function to restrict |
| `n` | `number` | The number of calls before the given function is invoked |

#### Returns

`fn`

Returns the new restricted function

▸ (`this`, `...args`): `void` \| `ReturnType`\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `unknown` |
| `...args` | `Parameters`\<`T`\> |

##### Returns

`void` \| `ReturnType`\<`T`\>

**`Example`**

```typescript
const caution = () => console.log("Caution!");
const limitedCaution = minCalls(caution, 2);

limitedCaution()
limitedCaution()
limitedCaution()
// => `caution` is invoked on the third call.
```

#### Defined in

[minCalls.ts:26](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/minCalls.ts#L26)

___

### simpleFuzzySearch

▸ **simpleFuzzySearch**(`pattern`, `array`): `string`[]

Fuzzy search an array of strings.
It does not use a scoring system
and returns the matches in the order they appear in the array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pattern` | `string` | The search input string |
| `array` | `string`[] | The array to search through |

#### Returns

`string`[]

An array of matches

#### Defined in

[fuzzySearch.ts:72](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/fuzzySearch.ts#L72)

___

### throttle

▸ **throttle**\<`T`\>(`func`, `wait`): `T`

Generates a function that invokes the given function `func` at most once per every `wait` milliseconds.
The throttled function always returns the result of the last `func` invocation.

This function can be used as a decorator with decThrottle.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`GenericFunction`](modules.md#genericfunction)\<`T`\> | The type of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | The function to throttle |
| `wait` | `number` | The number of milliseconds to throttle invocations to |

#### Returns

`T`

Returns the new throttled function

**`Example`**

```typescript
const throttled = throttle(() => console.log("Throttled!"), 1000);

throttled();
throttled();
// => "Throttled!" is logged once per second.
```

#### Defined in

[throttle.ts:24](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/throttle.ts#L24)

___

### times

▸ **times**\<`T`\>(`func`, `n`): `T`[]

Invokes a function `n` times, returning an array of the results of
each invocation.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`index`: `number`) => `T` | The function invoked per iteration |
| `n` | `number` | The number of times to invoke `func` |

#### Returns

`T`[]

Returns an array of results

**`Example`**

```typescript
times(index => console.log("Run", index), 3)
// => "Run 0" | "Run 1" | "Run 2"
times(Math.random, 3)
// => [0.123, 0.456, 0.789]
times(() => 0, 4)
// => [0, 0, 0, 0]
```

#### Defined in

[times.ts:21](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/function/src/times.ts#L21)
