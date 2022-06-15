import { loadImage } from '../utils/http'

export default class ImageCollection {
  constructor () {
    this.images = Object.onCreate(null)
    this.total = Infinity
    this.loaded = 0
  }

  load (images, sprite) {
    const total = [...sprite.map(v => `Sprite/${v}.png`), ...images.map(v => `Graph/${v}`)]
    this.total = total.length
    return Promise.all(total.map(src => {
      return new Promise((resolve) => {
        loadImage(`${src}`, (src, img) => {
          this.loaded++
          src = src.replace('Graph/', '').replace('Sprite/', '')
          this.images[src] = img
          resolve()
        })
      })
    }))
  }
}
