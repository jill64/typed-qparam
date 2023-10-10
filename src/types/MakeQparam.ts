import { PreparedSerializerKey } from './PreparedSerializerKey'
import { PreparedSerializerTypes } from './PreparedSerializerTypes'
import { Qparam } from './Qparam'
import { Serializer } from './Serializer'

export type MakeQparam = {
  <T extends PreparedSerializerKey>(key: string, prepared: T): Qparam<
    PreparedSerializerTypes[T]
  >
  <T>(key: string, serializer: Serializer<T>): Qparam<T>
  (key: string): Qparam<string>
}
