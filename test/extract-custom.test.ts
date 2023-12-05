import { expect, test } from 'vitest'
import { extract } from '../src/index.js'
import { json } from '../src/serde/index.js'

test('custom', () => {
  const qparam = extract(new URL('https://example.com/?json={"key": "value"}'))
  const js = qparam(
    'json',
    json(
      (x): x is { key: string } =>
        !!(
          x &&
          typeof x === 'object' &&
          'key' in x &&
          typeof x.key === 'string'
        )
    )
  )

  expect(js.get()).toEqual({ key: 'value' })
  expect(js.set({ key: 'new_value' }).href).toBe(
    'https://example.com/?json=%7B%22key%22%3A%22new_value%22%7D'
  )
})

const isStringArray = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every((y) => typeof y === 'string')

test('string-array', () => {
  const qparam = extract(
    new URL('https://example.com/?csv=["foo","bar","baz"]')
  )

  const non = qparam('non', json(isStringArray, []))
  expect(non.get()).toEqual([])

  const csv = qparam('csv', json(isStringArray))
  expect(csv.get()).toEqual(['foo', 'bar', 'baz'])
  expect(csv.set(['12', 'AB', '-=']).href).toBe(
    new URL('https://example.com/?csv=%5B%2212%22%2C%22AB%22%2C%22-%3D%22%5D')
      .href
  )
})
