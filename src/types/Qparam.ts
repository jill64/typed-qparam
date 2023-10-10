export type Qparam<T> = {
  get: () => T
  set: (value: T) => URL
}