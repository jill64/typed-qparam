import { expect, test } from 'vitest'
import { extract } from './index.js'
import { boolean, number, string } from './serde/index.js'

test('string', () => {
  const qparam = extract(new URL('https://example.com/?str=bar'))

  const non = qparam('non', string)
  expect(non.get()).toBe('')

  const str = qparam('str', string)
  expect(str.get()).toBe('bar')
  expect(str.set('baz').href).toBe('https://example.com/?str=baz')
})

test('number', () => {
  const qparam = extract(new URL('https://example.com/?num=123'))

  const non = qparam('non', number)
  expect(non.get()).toBe(0)

  const num = qparam('num', number)
  expect(num.get()).toBe(123)
  expect(num.set(56.78).href).toBe('https://example.com/?num=56.78')
})

test('boolean', () => {
  const qparam = extract(new URL('https://example.com/?bool=true'))

  const non = qparam('non', boolean)
  expect(non.get()).toBe(false)

  const bool = qparam('bool', boolean)
  expect(bool.get()).toBe(true)
  expect(bool.set(false).href).toBe('https://example.com/?bool=false')
})
