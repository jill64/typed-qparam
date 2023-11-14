import { expect, test } from 'vitest'
import { enums, extract } from './index.js'

test('enum', () => {
  const qparam = extract('https://example.com/?str=bar')

  const non = qparam('non', enums(['foo', 'bar'], 'foo'))
  expect(non.get()).toBe('foo')

  const str = qparam('str', enums(['foo', 'bar'], 'foo'))
  expect(str.get()).toBe('bar')
  expect(str.set('foo').href).toBe('https://example.com/?str=foo')
})
