import { assertType, test } from 'vitest'
import type { Qparam } from '../../src/types/index.js'

test('Qparam', () => {
  assertType<Qparam<number>>({
    get: () => 0,
    set: () => new URL('')
  })
})
