# typed-qparam

Type-safe query parameter manipulation

## Installation

```sh
npm i typed-qparam
```

## Example

```js
import { extract } from 'typed-qparam'

const qparam = extract('https://example.com/?foo=bar')

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

## Prepared Serializer

### Available Keys

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

## Custom Serializer

```ts
import { extract } from 'typed-qparam'

const qparam = extract()

const json = qparam<{ key: string }>('json', , {
  stringify: (value) => JSON.stringify(value),
  parse: (value) => JSON.parse(value ?? '')
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
