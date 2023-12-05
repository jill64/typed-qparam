import { expect, test } from 'vitest'
import { extract } from '../src/index.js'

test('string', () => {
  const qparam = extract(new URL('https://example.com/?str=bar&bar=foo'))
  const str = qparam('str')
  expect(str.get()).toBe('bar')
  expect(str.set('baz').href).toBe('https://example.com/?str=baz&bar=foo')
})
