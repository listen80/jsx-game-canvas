export function convertPropertyStr (str) {
  const o = {}
  str.split('&').forEach((str) => {
    const arr = str.split('.')
    if (arr.length === 1) {
      arr.unshift('')
    }
    if (arr.length === 3) {
      console.error(str)
    }
    const [context, propertyStr] = arr
    o[context] = {}
    propertyStr.split(';').forEach(v => {
      const [key, value] = v.split(':')
      o[context][key] = Number(value) || 0
    })
  })
  return o
}
