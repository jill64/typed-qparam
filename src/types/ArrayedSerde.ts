import { Serde } from '../serde/index.js'

export type ArrayedSerde<T> = Serde<T> & {
  readonly arrayed: true
}
