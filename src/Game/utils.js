export function convertPropertyStr (str) {
  const arr = str.split('.')
  if (arr.length === 1) {
    arr.unshift('')
  }
  const [key, propertyStr] = arr
  const properties = propertyStr.split(';').map(v => v.split(':'))
  return [key, properties]
}

export const formatText = (data) => {
  const o = []
  data = data.split(/\r?\n/)
  const keys = data.shift().split(',')
  data.forEach((row, index) => {
    if (!row.trim()) {
      return
    }
    const properties = row.split(',')
    const [id] = properties
    const item = { sy: index }
    keys.forEach((key, index) => {
      const value = properties[index]
      if (!value) {
        return
      }
      if (key === 'property') {
        item[key] = convertPropertyStr(value)
      } else if (['id', 'name', 'type'].includes(key)) {
        item[key] = value
      } else {
        if (isNaN(value)) {
          debugger
        }
        item[key] = Number(value)
      }
    })
    o[id] = item
    o.push(item)
    return data
  })
  return o
}
