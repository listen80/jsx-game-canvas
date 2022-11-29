import { loadJSON, loadText, loadImage, loadSound } from '../utils/http'

export default class Resource {
  constructor ($state) {
    this.loaded = 0
    this.total = 0
    this.loading = false

    this.$state = $state

    this.loadMapping()
    this.loadImage()
    this.loadSprite()
  }

  checkStatus () {
    if (this.loaded === this.total) {
      const timer = setTimeout(() => {
        this.loading = false
        clearTimeout(timer)
      }, 16)
    }
  }

  loadMapping () {
    this.$state.config.mapping.foreEach((v) => {
      this.total++
      loadText(`Data/${v}`).then((data) => {
        this.loaded++
        this.$state.mapping = data
      })
    })
  }

  loadImage () {
    this.$state.config.images.foreEach((v) => {
      this.total++
      loadImage(`Image/${v}`).then((data) => {
        this.$state.image[v] = data
        this.loaded++
        this.checkStatus()
      })
    })
  }

  loadSprite () {
    this.$state.config.sprites.foreEach((v) => {
      this.total++
      loadImage(`Sprite/${v}.png`).then((data) => {
        this.$state.image[v] = data
        this.loaded++
        this.checkStatus()
      })
      this.total++
      loadText(`Sprite/${v}.dat`).then((data) => {
        this.$state[v] = data
        this.loaded++
        this.checkStatus()
      })
    })
  }

  loadMap (id) {
    this.loaded = 0
    this.total = 0

    this.total++
    loadJSON(`Maps/${id}.json`).then((data) => {
      this.$state.map = data
      this.$state.mapKey = Math.random()
      this.loaded++
      this.checkStatus()
    })
  }
}
