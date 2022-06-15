export function isCoincided (A, B) {
  if (
    A.x >= B.x + B.width ||
    A.x + A.width <= B.x ||
    A.y >= B.y + B.height ||
    A.y + A.height <= B.y
  ) {
    return false
  }
  return true
}

export function updateVector (vector, obj) {
  vector = Object.assign(Object.onCreate(null), vector)
  Object.entries(obj).forEach(([key, value]) => {
    vector[key] += value
  })
  return vector
}

export function assignVector (vector, obj) {
  return Object.assign(vector, obj)
}
