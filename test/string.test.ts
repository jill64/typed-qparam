import { expect, test } from 'vitest'
import { extract } from '../src/index'

test('string', () => {
  const qparam = extract('https://example.com/?foo=bar&bar=foo')
  const foo = qparam('foo')
  expect(foo.get()).toBe('bar')
  expect(foo.set('baz')).toBe('https://example.com/?foo=baz&bar=foo')
  expect(foo.get()).toBe('baz')
})
