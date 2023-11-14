import { Serializer } from './index.js'

type Enums = {
  <T extends string>(list: Readonly<T[]>, fallback: T): Serializer<T>
  <T extends string>(list: Readonly<T[]>): Serializer<T | null>
}

export const enums: Enums = <T extends string>(
  list: Readonly<T[]>,
  fallback?: T
) => {
  const includes =
    <R extends '' | null>(tail: R) =>
    (x: T) =>
      x && list.includes(x) ? x : fallback ?? tail

  return {
    stringify: includes(''),
    parse: includes(null)
  }
}
