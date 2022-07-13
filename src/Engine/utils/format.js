export function convertPropertyStr(str) {
  const o = {}
  str.split('&').map((str) => {
    const arr = str.split('.')
    if (arr.length === 1) {
      arr.unshift('')
    }
    if (arr.length === 3) {
      console.error(str)
    }
    const [context, propertyStr] = arr
    o[context] = {}
    propertyStr.split(';').map(v => {
      const [key, value] = v.split(':')
      o[context][key] = Number(value) || 0
    })
  })
  return o
}

console.log(convertPropertyStr('flags.fairy&hero.atk:3;def:31&money:3'))

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
