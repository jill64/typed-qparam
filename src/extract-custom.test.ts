import { expect, test } from 'vitest'
import { extract } from './index.js'

test('custom', () => {
  const qparam = extract('https://example.com/?json={"key": "value"}')
  const json = qparam<{ key: string }>('json', {
    stringify: (value) => JSON.stringify(value),
    parse: (value) => JSON.parse(value ?? '')
  })
  expect(json.get()).toEqual({ key: 'value' })
  expect(json.set({ key: 'new_value' }).href).toBe(
    'https://example.com/?json=%7B%22key%22%3A%22new_value%22%7D'
  )
})
