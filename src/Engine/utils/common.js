export const isPrimitive = (value) => {
  const type = typeof value
  return type === 'string' || type === 'number'
}

export const isFunc = (f) => typeof f === 'function'

export const isArray = (a) => Array.isArray(a)

export const isUndefined = (o) => o === undefined || o === null

export const isString = (o) => typeof o === 'string'
