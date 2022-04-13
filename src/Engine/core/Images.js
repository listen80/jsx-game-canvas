import { loadImage } from '../utils/http'

export default class ImageCollection {
  constructor (images) {
    this.images = Object.create(null)
  }

  load (images, sprite) {
    return Promise.all([...sprite.map(v => `Sprite/${v}.png`), ...images.map(v => `Graph/${v}`)].map(src => {
      return new Promise((resolve) => {
        loadImage(`${src}`).then((img) => {
          src = src.replace('Graph/', '').replace('Sprite/', '')
          this.images[src] = img
          resolve()
        })
      })
    }))
  }
}
