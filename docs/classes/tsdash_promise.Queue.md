[Documentation](../README.md) / [Exports](../modules.md) / [@tsdash/promise](../modules/tsdash_promise.md) / Queue

# Class: Queue

[@tsdash/promise](../modules/tsdash_promise.md).Queue

A class managing an async function queue with limited concurrency (e.g., 10 functions with 3 running at a time).

**Methods:**
- `add` - Adds an async function or array of functions to the queue. Returns a promise that resolves or rejects when the added function(s) finish.
- `clear` - Clears the queue.
- `pause` - Pauses the queue.
- `resume` - Resumes the queue.
- `getQueue` - Returns the current queue.
- `isPaused` - Returns whether the queue is paused.
- `done` - Returns a promise resolving when all added tasks are finished. Individual rejections don't affect the done() promise.

**`Example`**

```ts
// Create a queue that can run 3 tasks concurrently
const queue = new Queue(3);

queue.add(() => fetch('https://example.com'));

queue.add(async () => {
  const response = await fetch('https://example.com');
  return response.json();
});

await queue.done();
console.log("All tasks finished");

// Add an array of tasks to the queue and wait for them to resolve
await queue.add([
  () => fetch('https://apple.com'),
  () => fetch('https://microsoft.com')
]);
// => [Response, Response]
```

## Table of contents

### Constructors

- [constructor](tsdash_promise.Queue.md#constructor)

### Properties

- [finishedPromise](tsdash_promise.Queue.md#finishedpromise)
- [finishedResolver](tsdash_promise.Queue.md#finishedresolver)
- [maxConcurrent](tsdash_promise.Queue.md#maxconcurrent)
- [paused](tsdash_promise.Queue.md#paused)
- [queue](tsdash_promise.Queue.md#queue)
- [running](tsdash_promise.Queue.md#running)

### Methods

- [add](tsdash_promise.Queue.md#add)
- [buildWaitingPromise](tsdash_promise.Queue.md#buildwaitingpromise)
- [checkIfDone](tsdash_promise.Queue.md#checkifdone)
- [clear](tsdash_promise.Queue.md#clear)
- [done](tsdash_promise.Queue.md#done)
- [getQueue](tsdash_promise.Queue.md#getqueue)
- [isPaused](tsdash_promise.Queue.md#ispaused)
- [pause](tsdash_promise.Queue.md#pause)
- [resume](tsdash_promise.Queue.md#resume)
- [run](tsdash_promise.Queue.md#run)

## Constructors

### constructor

• **new Queue**(`maxConcurrent`): [`Queue`](tsdash_promise.Queue.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxConcurrent` | `number` | The maximum number of async functions to run concurrently. |

#### Returns

[`Queue`](tsdash_promise.Queue.md)

#### Defined in

[queue.ts:49](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L49)

## Properties

### finishedPromise

• `Private` **finishedPromise**: `undefined` \| [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`boolean`\>

#### Defined in

[queue.ts:42](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L42)

___

### finishedResolver

• `Private` **finishedResolver**: `undefined` \| () => `void`

#### Defined in

[queue.ts:43](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L43)

___

### maxConcurrent

• `Private` **maxConcurrent**: `number`

#### Defined in

[queue.ts:39](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L39)

___

### paused

• `Private` **paused**: `boolean` = `false`

#### Defined in

[queue.ts:40](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L40)

___

### queue

• `Private` **queue**: `QueueElement`[] = `[]`

#### Defined in

[queue.ts:41](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L41)

___

### running

• `Private` **running**: `number` = `0`

#### Defined in

[queue.ts:38](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L38)

## Methods

### add

▸ **add**\<`P`, `T`\>(`asyncFn`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`P`\>

Add async functions or an array of async functions to the queue.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `P` |
| `T` | extends () => [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`P`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `asyncFn` | `T` | The async function(s) to add to the queue. |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`P`\>

A promise that resolves when the added function(s) finishes.

#### Defined in

[queue.ts:59](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L59)

▸ **add**\<`P`, `T`\>(`asyncFn`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`P`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `P` |
| `T` | extends () => [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`P`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncFn` | `T`[] |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`P`[]\>

#### Defined in

[queue.ts:60](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L60)

___

### buildWaitingPromise

▸ **buildWaitingPromise**\<`TProm`\>(`asyncFn`): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`TProm`\>

#### Type parameters

| Name |
| :------ |
| `TProm` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncFn` | () => [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`TProm`\> |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`TProm`\>

#### Defined in

[queue.ts:110](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L110)

___

### checkIfDone

▸ **checkIfDone**(): `void`

#### Returns

`void`

#### Defined in

[queue.ts:144](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L144)

___

### clear

▸ **clear**(): `void`

Removes all the tasks from the queue

#### Returns

`void`

#### Defined in

[queue.ts:72](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L72)

___

### done

▸ **done**(): [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`boolean`\>

Returns a shared promise that resolves when the queue is empty and all tasks have finished executing.

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`boolean`\>

#### Defined in

[queue.ts:100](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L100)

___

### getQueue

▸ **getQueue**(): () => [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`any`\>[]

Return the tasks added to the queue

#### Returns

() => [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`any`\>[]

#### Defined in

[queue.ts:90](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L90)

___

### isPaused

▸ **isPaused**(): `boolean`

Returns whether the queue is paused

#### Returns

`boolean`

#### Defined in

[queue.ts:95](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L95)

___

### pause

▸ **pause**(): `void`

Pauses the execution of the queue

#### Returns

`void`

#### Defined in

[queue.ts:79](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L79)

___

### resume

▸ **resume**(): `void`

Resumes the execution of the tasks in the queue

#### Returns

`void`

#### Defined in

[queue.ts:84](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L84)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[queue.ts:119](https://github.com/mhodge11/tsdash/blob/a16b6d9/packages/promise/src/queue.ts#L119)
