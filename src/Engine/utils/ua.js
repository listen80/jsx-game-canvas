export const checkChromeVersion = (value) => {
  if (location.protocol === 'file:') {
    return false
  } else {
    return true
  }
}
