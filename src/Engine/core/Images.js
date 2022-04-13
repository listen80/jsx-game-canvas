import { loadImage } from '../utils/http'

const sprite = [
  'enemys',
  'items',
  'animates',
  'icons',
  'npcs',
  'terrains',
  'boss',
]

const radioImages = [
  'Characters/hero.png',
  'ground.png',
  'Battlebacks/mota.jpg',
  'stand.png',
  'skill.png',
  'run.png',
  'fire.png',
  'fireFlys.png',
  'magic.jpeg',
]

export default class ImageCollection {
  constructor (images) {
    this.images = images || {}
  }

  load () {
    const loadImages = () => {
      const o = sprite.map(v => `Sprite/${v}.png`)
      const o2 = radioImages.map(v => `Graph/${v}`)

      return Promise.all([...o, ...o2].map(src => {
        return new Promise((resolve) => {
          loadImage(`${src}`).then((img) => {
            src = src.replace('Graph/', '')
            if (src.includes('Sprite')) {
              src = src.split('/')[1]
            }
            this.images[src] = img
            resolve()
          })
        })
      }))
    }

    return Promise.all([loadImages()])
  }
}
