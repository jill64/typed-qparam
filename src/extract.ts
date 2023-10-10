import type { MakeQparam } from './types/MakeQparam.js'
import type { PreparedSerializerKey } from './types/PreparedSerializerKey.js'
import type { Serializer } from './types/Serializer.js'
import { isPreparedSerializerKey } from './utils/isPreparedSerializerKey.js'
import { preparedSerializers } from './utils/preparedSerializers.js'

export const extract = (url: string | URL): MakeQparam => {
  const source = new URL(url)

  return <T>(
    key: string,
    serializer?: Serializer<T> | PreparedSerializerKey
  ) => {
    const { parse, stringify } = (
      isPreparedSerializerKey(serializer)
        ? preparedSerializers[serializer]
        : serializer ?? preparedSerializers.string
    ) as Serializer<T>

    const get = () => {
      const val = source.searchParams.get(key)
      return parse(val)
    }

    const set = (value: T) => {
      const dist = new URL(source)
      const val = stringify(value)
      dist.searchParams.set(key, val)
      return dist
    }

    return {
      get,
      set
    }
  }
}
