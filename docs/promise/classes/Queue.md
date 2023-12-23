[@tsdash/promise](../README.md) / [Exports](../modules.md) / Queue

# Class: Queue

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

```typescript
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

- [constructor](Queue.md#constructor)

### Properties

- [finishedPromise](Queue.md#finishedpromise)
- [finishedResolver](Queue.md#finishedresolver)
- [maxConcurrent](Queue.md#maxconcurrent)
- [paused](Queue.md#paused)
- [queue](Queue.md#queue)
- [running](Queue.md#running)

### Methods

- [add](Queue.md#add)
- [buildWaitingPromise](Queue.md#buildwaitingpromise)
- [checkIfDone](Queue.md#checkifdone)
- [clear](Queue.md#clear)
- [done](Queue.md#done)
- [getQueue](Queue.md#getqueue)
- [isPaused](Queue.md#ispaused)
- [pause](Queue.md#pause)
- [resume](Queue.md#resume)
- [run](Queue.md#run)

## Constructors

### constructor

• **new Queue**(`maxConcurrent`): [`Queue`](Queue.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxConcurrent` | `number` | The maximum number of async functions to run concurrently. |

#### Returns

[`Queue`](Queue.md)

#### Defined in

[queue.ts:49](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L49)

## Properties

### finishedPromise

• `Private` **finishedPromise**: `undefined` \| `Promise`\<`boolean`\>

#### Defined in

[queue.ts:42](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L42)

___

### finishedResolver

• `Private` **finishedResolver**: `undefined` \| () => `void`

#### Defined in

[queue.ts:43](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L43)

___

### maxConcurrent

• `Private` **maxConcurrent**: `number`

#### Defined in

[queue.ts:39](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L39)

___

### paused

• `Private` **paused**: `boolean` = `false`

#### Defined in

[queue.ts:40](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L40)

___

### queue

• `Private` **queue**: `QueueElement`[] = `[]`

#### Defined in

[queue.ts:41](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L41)

___

### running

• `Private` **running**: `number` = `0`

#### Defined in

[queue.ts:38](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L38)

## Methods

### add

▸ **add**\<`P`, `T`\>(`asyncFn`): `Promise`\<`P`\>

Add async functions or an array of async functions to the queue.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `P` |
| `T` | extends () => `Promise`\<`P`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `asyncFn` | `T` | The async function(s) to add to the queue. |

#### Returns

`Promise`\<`P`\>

A promise that resolves when the added function(s) finishes.

#### Defined in

[queue.ts:59](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L59)

▸ **add**\<`P`, `T`\>(`asyncFn`): `Promise`\<`P`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `P` |
| `T` | extends () => `Promise`\<`P`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncFn` | `T`[] |

#### Returns

`Promise`\<`P`[]\>

#### Defined in

[queue.ts:60](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L60)

___

### buildWaitingPromise

▸ **buildWaitingPromise**\<`TProm`\>(`asyncFn`): `Promise`\<`TProm`\>

#### Type parameters

| Name |
| :------ |
| `TProm` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `asyncFn` | () => `Promise`\<`TProm`\> |

#### Returns

`Promise`\<`TProm`\>

#### Defined in

[queue.ts:110](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L110)

___

### checkIfDone

▸ **checkIfDone**(): `void`

#### Returns

`void`

#### Defined in

[queue.ts:144](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L144)

___

### clear

▸ **clear**(): `void`

Removes all the tasks from the queue

#### Returns

`void`

#### Defined in

[queue.ts:72](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L72)

___

### done

▸ **done**(): `Promise`\<`boolean`\>

Returns a shared promise that resolves when the queue is empty and all tasks have finished executing.

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[queue.ts:100](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L100)

___

### getQueue

▸ **getQueue**(): () => `Promise`\<`any`\>[]

Return the tasks added to the queue

#### Returns

() => `Promise`\<`any`\>[]

#### Defined in

[queue.ts:90](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L90)

___

### isPaused

▸ **isPaused**(): `boolean`

Returns whether the queue is paused

#### Returns

`boolean`

#### Defined in

[queue.ts:95](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L95)

___

### pause

▸ **pause**(): `void`

Pauses the execution of the queue

#### Returns

`void`

#### Defined in

[queue.ts:79](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L79)

___

### resume

▸ **resume**(): `void`

Resumes the execution of the tasks in the queue

#### Returns

`void`

#### Defined in

[queue.ts:84](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L84)

___

### run

▸ **run**(): `void`

#### Returns

`void`

#### Defined in

[queue.ts:119](https://github.com/mhodge11/tsdash/blob/d8fd390/packages/promise/src/queue.ts#L119)
