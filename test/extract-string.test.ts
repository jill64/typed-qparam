import { expect, test } from 'vitest'
import { extract } from '../src/index.js'

test('string', () => {
  const qparam = extract(new URL('https://example.com/?str=bar&bar=foo'))

  const str = qparam('str')

  expect(str.get()).toBe('bar')

  const url = str.set('baz')

  expect(url.href).toBe('https://example.com/?str=baz&bar=foo')

  const str2 = extract(url)('str')

  expect(str2.get()).toBe('baz')

  const url2 = str2.set('')

  expect(url2.href).toBe('https://example.com/?bar=foo')
})
