import { PreparedSerializerKey } from '../types/PreparedSerializerKey.js'
import { preparedSerializers } from './preparedSerializers.js'

export const isPreparedSerializerKey = (
  key: unknown
): key is PreparedSerializerKey =>
  typeof key === 'string' && key in preparedSerializers
