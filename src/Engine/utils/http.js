
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

export const loadImage = (src, callback) => {
  return new Promise(function (resolve, reject) {
    const img = new Image()
    img.addEventListener('load', () => {
      callback && callback(src, img)
      resolve(img)
    })
    img.addEventListener('error', () => reject(img))
    img.src = src
  })
}

export const loadMovie = (src, callback) => {
  return new Promise(function (resolve, reject) {
    const img = new Image()
    img.addEventListener('load', () => {
      callback && callback(src, img)
      resolve(img)
    })
    img.addEventListener('error', () => reject(img))
    img.src = src
  })
}

export const loadSound = (src, callback) => {
  const audio = new Audio()
  audio.addEventListener('canplay', () => {
    callback && callback(src, audio)
  })
  audio.addEventListener('error', () => callback(audio))
  audio.src = src
  return audio
}

export function loadJSON (url) {
  return fetch(url).then((data) => data.json())
}

export function loadText (url) {
  return fetch(url)
    .then((data) => data.text())
    .then((data) => formatText(data))
}

export function loadFont ({ name, url }) {
  const fontface = new FontFace(name, `url("${url}")`)
  document.fonts.add(fontface)
  fontface.load()
  return fontface.loaded
}
