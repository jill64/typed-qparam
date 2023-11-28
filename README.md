<!----- BEGIN GHOST DOCS HEADER ----->

# typed-qparam

[![npm-version](https://img.shields.io/npm/v/typed-qparam)](https://npmjs.com/package/typed-qparam) [![npm-license](https://img.shields.io/npm/l/typed-qparam)](https://npmjs.com/package/typed-qparam) [![npm-download-month](https://img.shields.io/npm/dm/typed-qparam)](https://npmjs.com/package/typed-qparam) [![npm-min-size](https://img.shields.io/bundlephobia/min/typed-qparam)](https://npmjs.com/package/typed-qparam) [![ci.yml](https://github.com/jill64/typed-qparam/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/typed-qparam/actions/workflows/ci.yml) [![codecov-coverage](https://codecov.io/gh/jill64/typed-qparam/graph/badge.svg)](https://codecov.io/gh/jill64/typed-qparam)

🔍 Type-safe query parameter manipulation

## Installation

```sh
npm i typed-qparam
```

<!----- END GHOST DOCS HEADER ----->

## Example

> [!NOTE]
>
> `string` input was not supported in v1. Please use `URL` instead.

```js
import { extract } from 'typed-qparam'

const qparam = extract(new URL('https://example.com/?foo=bar'))

const foo = qparam('foo')

/**
 * @value 'bar'
 * @type {string}
 */
console.log(foo.get())

/** @type {URL} */
const url = foo.set('baz')

/**
 * @value 'https://example.com/?foo=baz'
 */
console.log(url.href)
```

## Custom Serializer

> [!NOTE]
>
> Property names for custom serializers have been changed.
>
> ```ts
> // v1
> {
>   stringify: // ... value => string
>   parse: // ... string => value
> }
> ```
>
> ```ts
> // v2
> {
>   serialize: // ... value => string
>   deserialize: // ... string => value
> }
> ```

```ts
import { extract } from 'typed-qparam'

const qparam = extract(/* ... */)

const json = qparam('json', {
  serialize: (value) => JSON.stringify(value),
  deserialize: (value) => JSON.parse(value)
})

/**
 * @value { key: 'value' }
 * @type { key: string }
 */
console.log(json.get())

/** @type {URL} */
const url = json.set({ key: 'new_value' })

/**
 * @value 'https://example.com/?json={"key": "new_value"}'
 */
console.log(url.href)
```

## Legacy (<= v1)

### Prepared Serializer

#### Available Keys

| number    | type     |
| --------- | -------- |
| `string`  | string   |
| `number`  | number   |
| `boolean` | boolean  |
| `csv`     | string[] |

```js
import { extract } from 'typed-qparam'

const qparam = extract('https://example.com/?num=123')

const foo = qparam('foo', 'number')

/**
 * @value 123
 * @type {number}
 */
console.log(foo.get())
```
