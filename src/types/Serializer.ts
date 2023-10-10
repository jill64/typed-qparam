export type Serializer<T> = {
  stringify: (val: T) => string
  parse: (str: string | null) => T
}
