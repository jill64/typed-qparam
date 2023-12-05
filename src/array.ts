import { Serde, string } from './serde/index.js'
import { ArrayedSerde } from './types/ArrayedSerde.js'

export const array = <T = string>(serde?: Serde<T>): ArrayedSerde<T> => ({
  ...((serde ?? string) as Serde<T>),
  arrayed: true
})
