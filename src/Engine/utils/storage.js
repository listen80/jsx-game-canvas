export function setStorage (key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage (key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return null
  }
}
