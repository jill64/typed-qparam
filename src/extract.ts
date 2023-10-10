import { preparedSerializers } from './preparedSerializers.js'
import type { PreparedSerializerKey } from './types/PreparedSerializerKey.js'
import type { Serializer } from './types/Serializer.js'

export const extract = (url: string | URL) => {
  const source = new URL(url)

  return <T = string>(
    key: string,
    serializer: Serializer<T> | PreparedSerializerKey = 'string'
  ) => {
    const { parse, stringify } = (
      typeof serializer === 'string'
        ? preparedSerializers[serializer]
        : serializer
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
