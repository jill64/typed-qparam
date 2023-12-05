import { expect, test } from 'vitest'
import { extract } from '../src/index.js'
import { enums } from '../src/serde/index.js'

test('enum', () => {
  const qparam = extract(new URL('https://example.com/?str=bar'))

  const non = qparam('non', enums(['foo', 'bar'], 'foo'))
  expect(non.get()).toBe('foo')

  const str = qparam('str', enums(['foo', 'bar'], 'foo'))
  expect(str.get()).toBe('bar')
  expect(str.set('foo').href).toBe('https://example.com/?str=foo')
})
