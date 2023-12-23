[Documentation](../README.md) / [Exports](../modules.md) / @tsdash/string

# Module: @tsdash/string

## Table of contents

### Functions

- [camelCase](tsdash_string.md#camelcase)
- [capitalize](tsdash_string.md#capitalize)
- [deburr](tsdash_string.md#deburr)
- [escapeHtml](tsdash_string.md#escapehtml)
- [escapeRegExp](tsdash_string.md#escaperegexp)
- [kebabCase](tsdash_string.md#kebabcase)
- [pascalCase](tsdash_string.md#pascalcase)
- [replaceLast](tsdash_string.md#replacelast)
- [snakeCase](tsdash_string.md#snakecase)
- [splitWords](tsdash_string.md#splitwords)
- [titleCase](tsdash_string.md#titlecase)
- [trim](tsdash_string.md#trim)
- [trimEnd](tsdash_string.md#trimend)
- [trimStart](tsdash_string.md#trimstart)
- [unescapeHtml](tsdash_string.md#unescapehtml)

## Functions

### camelCase

▸ **camelCase**(`str`): `string`

Converts `string` to camelCase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to convert |

#### Returns

`string`

Returns the camel cased string

**`Example`**

```ts
camelCase('Foo Bar')
// => 'fooBar'
camelCase('--foo-bar--')
// => 'fooBar'
camelCase('__FOO_BAR__')
// => 'fooBar'
```

#### Defined in

[camelCase.ts:21](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/camelCase.ts#L21)

___

### capitalize

▸ **capitalize**(`str`): `string`

Converts the first character of a string to upper case and the remaining to lower case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to capitalize. |

#### Returns

`string`

Returns the capitalized string.

**`Example`**

```ts
capitalize('FRED')
// => 'Fred'
```

#### Defined in

[capitalize.ts:14](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/capitalize.ts#L14)

___

### deburr

▸ **deburr**(`str`): `string`

Deburrs a string by converting
[Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
letters to basic Latin letters and removing
[combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to deburr |

#### Returns

`string`

Returns the deburred string

**`Example`**

```ts
deburr('déjà vu')
// => 'deja vu'
```

#### Defined in

[deburr.ts:18](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/deburr.ts#L18)

___

### escapeHtml

▸ **escapeHtml**(`str`): `string`

Converts the characters `&`, `<`, `>`, `"` and `'` in a string to their corresponding HTML entities.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to escape |

#### Returns

`string`

Returns the escaped string

**`Example`**

```ts
escapeHtml('fred, barney, & pebbles')
// => 'fred, barney, &amp; pebbles'
```

#### Defined in

[escapeHtml.ts:14](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/escapeHtml.ts#L14)

___

### escapeRegExp

▸ **escapeRegExp**(`str`): `string`

Escapes the `RegExp` special characters `^`, `$`, `\`, `.`, `*`, `+`,
`?`, `(`, `)`, `[`, `]`, `{`, `}`, and `|` in a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to escape |

#### Returns

`string`

Returns the escaped string

**`Example`**

```ts
escapeRegExp('[moderndash](https://moderndash.io/)')
// => '\[moderndash\]\(https://moderndash\.io/\)'
```

#### Defined in

[escapeRegExp.ts:15](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/escapeRegExp.ts#L15)

___

### kebabCase

▸ **kebabCase**(`str`): `string`

Converts a string to kebab-case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to convert |

#### Returns

`string`

Returns the kebab cased string

**`Example`**

```ts
kebabCase('Foo Bar')
// => 'foo-bar'
kebabCase('fooBar')
// => 'foo-bar'
kebabCase('__FOO_BAR__')
// => 'foo-bar'
```

#### Defined in

[kebabCase.ts:21](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/kebabCase.ts#L21)

___

### pascalCase

▸ **pascalCase**(`str`): `string`

Converts a string to PascalCase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to convert |

#### Returns

`string`

Returns the pascal cased string

**`Example`**

```ts
pascalCase('Foo Bar')
// => 'FooBar'
pascalCase('fooBar')
// => 'FooBar'
pascalCase('__FOO_BAR__')
// => 'FooBar'
```

#### Defined in

[pascalCase.ts:21](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/pascalCase.ts#L21)

___

### replaceLast

▸ **replaceLast**(`str`, `searchFor`, `replaceWith`): `string`

Replaces the last occurrence of a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to replace in |
| `searchFor` | `string` | The string to search for |
| `replaceWith` | `string` | The string to replace with |

#### Returns

`string`

The replaced string

**`Example`**

```ts
replaceLast("Foo Bar Bar", "Bar", "Boo");
// => "Foo Bar Boo"
```

#### Defined in

[replaceLast.ts:16](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/replaceLast.ts#L16)

___

### snakeCase

▸ **snakeCase**(`str`): `string`

Converts a string to snake_case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to convert |

#### Returns

`string`

Returns the snake cased string

**`Example`**

```ts
snakeCase('Foo Bar')
// => 'foo_bar'
snakeCase('fooBar')
// => 'foo_bar'
snakeCase('--FOO-BAR--')
// => 'foo_bar'
snakeCase('foo2bar')
// => 'foo_2_bar'
```

#### Defined in

[snakeCase.ts:23](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/snakeCase.ts#L23)

___

### splitWords

▸ **splitWords**(`str`): `string`[]

Split a string into words. Can deal with camelCase, PascalCase & snake_case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to split into words |

#### Returns

`string`[]

An array of words

**`Example`**

```ts
splitWords('camelCase')
// => ['camel', 'Case']

splitWords('PascalCase')
// => ['Pascal', 'Case']

splitWords('hello_world-123')
// => ['hello', 'world', '123']
```

#### Defined in

[splitWords.ts:20](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/splitWords.ts#L20)

___

### titleCase

▸ **titleCase**(`str`): `string`

Converts a string to Title Case.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to convert |

#### Returns

`string`

Returns the title cased string

**`Example`**

```ts
titleCase('--foo-bar--')
// => 'Foo Bar'
titleCase('fooBar')
// => 'Foo Bar'
titleCase('__FOO_BAR__')
// => 'Foo Bar'
titleCase('HélloWorld')
// => 'Hello World'
```

#### Defined in

[titleCase.ts:23](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/titleCase.ts#L23)

___

### trim

▸ **trim**(`str`, `chars`): `string`

Trim the string from the left and right by the given characters

*Use the native [trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim) method if you want to trim whitespace.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to trim |
| `chars` | `string` | The characters to trim |

#### Returns

`string`

The trimmed string

**`Example`**

```ts
trim('$$abc$', '$') // => 'abc'
trim('!!abc_!', '_!') // => 'abc'
```

#### Defined in

[trim.ts:16](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/trim.ts#L16)

___

### trimEnd

▸ **trimEnd**(`str`, `chars`): `string`

Trims the specified characters from the end of the string.

*Use the native [trimEnd](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) method if you want to trim whitespace.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to trim |
| `chars` | `string` | The characters to trim |

#### Returns

`string`

The trimmed string

**`Example`**

```ts
trimEnd('abc$$$', '$') // => 'abc'
trimEnd('abc_!!_', '_!') // => 'abc'
```

#### Defined in

[trimEnd.ts:17](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/trimEnd.ts#L17)

___

### trimStart

▸ **trimStart**(`str`, `chars`): `string`

Trims specified characters from the start of the string.

*Use the native [trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) method if you want to trim whitespace.*

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to trim |
| `chars` | `string` | The characters to trim |

#### Returns

`string`

The trimmed string

**`Example`**

```ts
trimStart('$$$abc', '$') // => 'abc'
trimStart('_!!_abc', '_!') // => 'abc'
```

#### Defined in

[trimStart.ts:17](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/trimStart.ts#L17)

___

### unescapeHtml

▸ **unescapeHtml**(`str`): `string`

Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;`
in a string to their corresponding characters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | The string to unescape |

#### Returns

`string`

Returns the unescaped string

**`Example`**

```ts
unescapeHtml('fred, barney, &amp; pebbles')
// => 'fred, barney, & pebbles'
```

#### Defined in

[unescapeHtml.ts:15](https://github.com/mhodge11/tsdash/blob/c625984/packages/string/src/unescapeHtml.ts#L15)
