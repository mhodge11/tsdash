[Documentation](../README.md) / [Exports](../modules.md) / @tsdash/decorator

# Module: @tsdash/decorator

## Table of contents

### Functions

- [decDebounce](tsdash_decorator.md#decdebounce)
- [decMaxCalls](tsdash_decorator.md#decmaxcalls)
- [decMemoize](tsdash_decorator.md#decmemoize)
- [decMinCalls](tsdash_decorator.md#decmincalls)
- [decThrottle](tsdash_decorator.md#decthrottle)
- [toDecorator](tsdash_decorator.md#todecorator)

## Functions

### decDebounce

▸ **decDebounce**(`wait`): (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

Debounces the decorated function. Only calling it after a specified amount of time has passed without any new calls.

Look at debounce for the non-decorator version.

*Requires the [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) flag to be set.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wait` | `number` | Milliseconds to wait before invoking the decorated function after the last invocation. |

#### Returns

`fn`

▸ (`_target`, `_key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_target` | `unknown` |
| `_key` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`Example`**

```ts
class TestClass {
  @decDebounce(100)
  testMethod(str: string) {
    console.log("Debounced:", str);
  }
}

const instance = new TestClass();
instance.testMethod("Hello");
instance.testMethod("World");
// => Only the second invocation of `debouncedSayHello` is executed, after a delay of 1000ms.
```

#### Defined in

[decorator/src/decDebounce.ts:30](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/decorator/src/decDebounce.ts#L30)

___

### decMaxCalls

▸ **decMaxCalls**(`n`): (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

Only invokes the decorated function as long as it's called `<= n` times.
Subsequent calls to the decorated function return the result of the last invocation.

Look at maxCalls for the non-decorator version.

*Requires the [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) flag to be set.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number of calls before the cached result is returned. |

#### Returns

`fn`

▸ (`_target`, `_key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_target` | `unknown` |
| `_key` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`Example`**

```ts
class TestClass {
 private count = 0;

 @decMaxCalls(2)
 testMethod() {
   return ++this.count;
 }
}

const instance = new TestClass();
instance.testMethod(); // => 1
instance.testMethod(); // => 2
instance.testMethod(); // => 2
```

#### Defined in

[decorator/src/decMaxCalls.ts:33](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/decorator/src/decMaxCalls.ts#L33)

___

### decMemoize

▸ **decMemoize**(`options?`): (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

Memoizes the decorated function.
The cache key is either determined by the provided resolver or by the arguments used in the memoized function.

**Options:**
- `resolver` A function that determines the cache key for storing the result based on the arguments provided.
- `ttl` sets the time to live for the cache in milliseconds. After `ttl` milliseconds, the next call to the memoized function will result in a cache miss.

Look at memoize for the non-decorator version.

*Requires the [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) flag to be set.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `undefined` \| \{ `resolver?`: (...`args`: `unknown`[]) => `string` ; `ttl?`: `number`  } | The options object. |

#### Returns

`fn`

▸ (`_target`, `_key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_target` | `unknown` |
| `_key` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`Example`**

```ts
class TestClass {
  @decMemoize({ ttl: 1000 })
  testMethod(a: number, b: number) {
    return a + b;
  }
}

const instance = new TestClass();
instance.testMethod(1, 2); // => 3
instance.testMethod(1, 2); // => 3 (cached)

// After 1 second:
instance.testMethod(1, 2); // => 3 (cache miss)
```

#### Defined in

[decorator/src/decMemoize.ts:39](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/decorator/src/decMemoize.ts#L39)

___

### decMinCalls

▸ **decMinCalls**(`n`): (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

Only invokes the decorated function after it's called more than `n` times.

Look at minCalls for the non-decorator version.

*Requires the [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) flag to be set.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n` | `number` | The number of calls before the decorated function is invoked. |

#### Returns

`fn`

▸ (`_target`, `_key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_target` | `unknown` |
| `_key` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`Example`**

```ts
class TestClass {
  @decMinCalls(2)
  testMethod() {
    return 1;
  }
}

const instance = new TestClass();
instance.testMethod(); // => undefined
instance.testMethod(); // => undefined
instance.testMethod(); // => 1
```

#### Defined in

[decorator/src/decMinCalls.ts:30](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/decorator/src/decMinCalls.ts#L30)

___

### decThrottle

▸ **decThrottle**(`wait`): (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

The decorated function is invoked at most once per every `wait` milliseconds.

Look at throttle for the non-decorator version.

*Requires the [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators) flag to be set.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wait` | `number` | The number of milliseconds to wait between invocations. |

#### Returns

`fn`

▸ (`_target`, `_key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_target` | `unknown` |
| `_key` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`Example`**

```ts
class TestClass {
  @decThrottle(1000)
  testMethod() {
    console.log("Throttled!");
  }
}

const instance = new TestClass();
instance.testMethod(); // => "Throttled!" is logged once per second.
instance.testMethod(); // nothing happens
```

#### Defined in

[decorator/src/decThrottle.ts:29](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/decorator/src/decThrottle.ts#L29)

___

### toDecorator

▸ **toDecorator**\<`T`\>(`func`): (...`args`: `Tail`\<[`Parameters`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype )\<`T`\>\>) => (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

Transforms a function into a decorator function.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `GenericFunction`\<`T`\> | The type of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `T` | The function to transform |

#### Returns

`fn`

A decorator function that can be used to decorate a method

▸ (`...args`): (`_target`: `unknown`, `_key`: `string`, `descriptor`: `PropertyDescriptor`) => `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Tail`\<[`Parameters`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype )\<`T`\>\> |

##### Returns

`fn`

▸ (`_target`, `_key`, `descriptor`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `_target` | `unknown` |
| `_key` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`void`

**`Example`**

```ts
function log(func: Function, message: string) {
  return function (...args: unknown[]) {
    console.log(message);
    return func(...args);
  };
}

const logger = toDecorator(log);

class TestClass {
  @logger("Hello world!")
  testMethod() {
    return 1;
  }
}

const instance = new TestClass();
instance.testMethod();
// => Log "Hello World" and return 1
```

#### Defined in

[decorator/src/toDecorator.ts:34](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/decorator/src/toDecorator.ts#L34)
