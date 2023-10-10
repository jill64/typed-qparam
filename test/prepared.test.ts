import { expect, test } from 'vitest'
import { extract } from '../src/index'

test('string', () => {
  const qparam = extract('https://example.com/?str=bar')
  const str = qparam('str', 'string')
  expect(str.get()).toBe('bar')
  expect(str.set('baz').href).toBe('https://example.com/?str=baz')
})

test('number', () => {
  const qparam = extract('https://example.com/?num=123')
  const num = qparam('num', 'number')
  expect(num.get()).toBe(123)
  expect(num.set(56.78).href).toBe('https://example.com/?num=56.78')
})

test('boolean', () => {
  const qparam = extract('https://example.com/?bool=true')
  const bool = qparam('bool', 'boolean')
  expect(bool.get()).toBe(true)
  expect(bool.set(false).href).toBe('https://example.com/?bool=false')
})

test('csv', () => {
  const qparam = extract('https://example.com/?csv=')
  const csv = qparam('csv', 'csv')
  expect(csv.get()).toEqual([])
  expect(csv.set(['12', 'AB', '-=']).href).toBe(
    'https://example.com/?csv=12%2CAB%2C-%3D'
  )
})
