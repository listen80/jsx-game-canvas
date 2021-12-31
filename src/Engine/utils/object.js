export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function merge (origin, obj) {
  if (typeof origin === 'object') {
    for (const i in origin) {
      if (obj[i] !== undefined) {
        origin[i] = merge(origin[i], obj[i])
      }
    }
  }
  return origin
}
