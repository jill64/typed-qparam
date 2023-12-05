import { expect, test } from 'vitest'
import { array, extract } from '../src/index.js'
import { integer } from '../src/serde/index.js'

test('array-number', () => {
  const qparam = extract(new URL('https://example.com/?num=1&num=2'))
  const num = qparam('num', array(integer))
  expect(num.get()).toEqual([1, 2])
  expect(num.set([45, 56]).href).toBe('https://example.com/?num=45&num=56')
})
