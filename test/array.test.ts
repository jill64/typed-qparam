import { expect, test } from 'vitest'
import { array, extract } from '../src/index.js'

test('array', () => {
  const qparam = extract(new URL('https://example.com/?str=hello&str=world'))
  const str = qparam('str', array())

  expect(str.get()).toEqual(['hello', 'world'])

  const url = str.set(['foo', 'bar'])

  expect(url.href).toBe('https://example.com/?str=foo&str=bar')

  const str2 = extract(url)('str', array())
  expect(str2.get()).toEqual(['foo', 'bar'])

  expect(str.set([]).href).toBe('https://example.com/')
})
