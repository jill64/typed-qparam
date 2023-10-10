import { PreparedSerializerKey } from './PreparedSerializerKey.js'
import { PreparedSerializerTypes } from './PreparedSerializerTypes.js'
import { Qparam } from './Qparam.js'
import { Serializer } from './Serializer.js'

export type MakeQparam = {
  <T extends PreparedSerializerKey>(
    key: string,
    prepared: T
  ): Qparam<PreparedSerializerTypes[T]>
  <T>(key: string, serializer: Serializer<T>): Qparam<T>
  (key: string): Qparam<string>
}
