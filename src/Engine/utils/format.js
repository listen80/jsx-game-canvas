export function convertPropertyStr(str) {
  const arr = str.split('.')
  if (arr.length === 1) {
    arr.unshift('')
  }
  const [key, propertyStr] = arr
  const properties = propertyStr.split(';').map(v => v.split(':'))
  return [key, properties]
}

const map = {}

export const formatText = (text) => {
  const o = Object.create(null)
  const dataArray = text.split(/\r?\n/)
  const keys = dataArray.shift().split(',')
  dataArray.forEach((row, index) => {
    if (!row.trim() || row.startsWith('//') || row.startsWith('#')) {
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
      if (['id', 'name', 'type'].includes(key)) {
        item[key] = value
      } else {
        item[key] = isNaN(value) ? value : Number(value)
      }
    })
    o[id] = item
  })

  return o
}
