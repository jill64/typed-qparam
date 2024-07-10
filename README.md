<!----- BEGIN GHOST DOCS HEADER ----->

# typed-qparam

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://npmjs.com/package/typed-qparam"><img src="https://img.shields.io/npm/v/typed-qparam" alt="npm-version" /></a> <a href="https://npmjs.com/package/typed-qparam"><img src="https://img.shields.io/npm/l/typed-qparam" alt="npm-license" /></a> <a href="https://npmjs.com/package/typed-qparam"><img src="https://img.shields.io/npm/dm/typed-qparam" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/typed-qparam"><img src="https://img.shields.io/bundlephobia/min/typed-qparam" alt="npm-min-size" /></a> <a href="https://github.com/jill64/typed-qparam/actions/workflows/ci.yml"><img src="https://github.com/jill64/typed-qparam/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>

<!----- END GHOST DOCS BADGES ----->

🔍 Type-safe query parameter manipulation

<!----- END GHOST DOCS HEADER ----->

> [!NOTE]
> See [here](./docs/v1.md) for documentation on <=v1 features.

## Installation

```sh
npm i typed-qparam
```

## Simple Usage

Passing a query parameter key to the `qparam` function returns the accessor for that value.

```js
import { extract } from 'typed-qparam'

const qparam = extract(new URL('https://example.com/?foo=bar'))

const foo = qparam('foo')

// output: 'bar'
console.log(foo.get())

// .set() only returns a new URL instance.
// The original URL instance is not changed.
// No navigation of any kind will occur.

// url: new URL('https://example.com/?foo=baz')
const url = foo.set('baz')

// output: 'https://example.com/?foo=baz'
console.log(url.href)
```

## Typed Param

By passing a conversion function as the second argument, you can obtain a value converted to any type.
See [ts-serde](https://github.com/jill64/ts-serde#readme) for more information on type guard.

```js
import { extract } from 'typed-qparam'
import { number } from 'typed-qparam/serde'

const qparam = extract(new URL('https://example.com/?num=123'))

const num = qparam('num', {
  stringify: (value) => value.toString(),
  parse: (str) => parseInt(str)
})

// output 123
console.log(num.get())

// https://example.com/?key=456
const dist = num.set(456)
```

### Prepared Converter

You can also use the prepared converters in `typed-qparam/serde`.

```js
import { extract } from 'typed-qparam'
import { number, boolean, enums } from 'typed-qparam/serde'

const qparam = extract(
  new URL('https://example.com/?num=123&bool=true&enumerate=b')
)

const num = qparam('num', number)
const bool = qparam('bool', boolean)
const enumerate = qparam(
  'enumerate',
  enums(
    ['a', 'b', 'c'],
    'a' // fallback default value
  )
)
```

## Array Param

Sometimes you need to handle query parameters with multiple values in the same key, such as `?str=hello&str=world`.  
With `typed-qparam`, you can treat this as an array.

```js
import { extract, array } from 'svelte-qparam'
import { string, number } from 'svelte-qparam/serde'

const qparam = extract(new URL('https://example.com/?str=hello&str=world'))

const str = qparam('str', array())
// is equivalent to
// const str = qparam('str', array(string))

// if require other typed value
const num = qparam('num', array(number))

// output ['hello', 'world']
console.log(str.get())

// https://example.com/?str=foo&str=bar&str=baz
str.set(['foo', 'bar', 'baz'])
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->
