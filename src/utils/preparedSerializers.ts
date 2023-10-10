import { PreparedSerializerKey } from '../types/PreparedSerializerKey.js'
import { PreparedSerializerTypes } from '../types/PreparedSerializerTypes.js'
import { Serializer } from '../types/Serializer.js'

export const preparedSerializers = {
  string: {
    stringify: (val) => val,
    parse: (str) => str ?? ''
  },
  number: {
    stringify: (val) => val.toString(),
    parse: (str) => (str ? Number(str) : 0)
  },
  boolean: {
    stringify: (val) => val.toString(),
    parse: (str) => str === 'true'
  },
  csv: {
    stringify: (val) => val.join(','),
    parse: (str) => (str ? str?.split(',') : [])
  }
} satisfies {
  [key in PreparedSerializerKey]: Serializer<PreparedSerializerTypes[key]>
}
