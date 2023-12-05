import { Serde, string } from './serde/index.js'
import { ArrayedSerde } from './types/ArrayedSerde.js'
import { Qparam } from './types/Qparam.js'
import { isArrayedSerde } from './utils/isArrayedSerde.js'

export const extract =
  (
    url: URL
  ): {
    <T>(key: string, arrayedSerde: ArrayedSerde<T>): Qparam<T[]>
    <T>(key: string, serde: Serde<T>): Qparam<T>
    (key: string): Qparam<string>
  } =>
  <T>(key: string, serde?: Serde<T> | ArrayedSerde<T>) => {
    const { serialize, deserialize } = (serde ?? string) as Serde<T>
    const arrayed = isArrayedSerde(serde)

    const get = () =>
      arrayed
        ? url.searchParams.getAll(key).map(deserialize)
        : deserialize(url.searchParams.get(key) ?? '')

    const set = (value: T | T[]) => {
      const dist = new URL(url)

      if (arrayed) {
        if (Array.isArray(value)) {
          dist.searchParams.delete(key)
          value.forEach((v) => dist.searchParams.append(key, serialize(v)))
        }
      } else {
        const str = serialize(value as T)

        if (str) {
          dist.searchParams.set(key, str)
        } else {
          dist.searchParams.delete(key)
        }
      }

      return dist
    }

    return {
      get,
      set
    }
  }
