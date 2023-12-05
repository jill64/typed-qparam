import { Serde } from 'ts-serde'
import { ArrayedSerde } from '../types/ArrayedSerde.js'

export const isArrayedSerde = <T>(serde?: Serde<T>): serde is ArrayedSerde<T> =>
  !!(serde && 'arrayed' in serde && serde.arrayed === true)
