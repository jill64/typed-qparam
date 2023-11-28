import { Serde } from 'ts-serde'
import { string } from 'ts-serde/primitive'
import { Qparam } from './types/Qparam.js'

export const extract =
  (
    url: URL
  ): {
    <T>(key: string, serde: Serde<T>): Qparam<T>
    (key: string): Qparam<string>
  } =>
  <T>(key: string, serde?: Serde<T>) => {
    const { serialize, deserialize } = (serde ?? string) as Serde<T>

    const get = () => {
      const str = url.searchParams.get(key) ?? ''
      return deserialize(str)
    }

    const set = (value: T) => {
      const dist = new URL(url)
      const str = serialize(value)

      if (str) {
        dist.searchParams.set(key, str)
      } else {
        dist.searchParams.delete(key)
      }

      return dist
    }

    return {
      get,
      set
    }
  }
