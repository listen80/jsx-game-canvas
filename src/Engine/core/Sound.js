import { loadSound } from '../utils/http'

export default class Sound {
  constructor (config) {
    this.config = config
    this.sounds = Object.create(null)
    this.total = Infinity
  }

  control (type, name, control) {
    return null
    return loadSound(`Sound/${type}/${name}`, (src, el) => {
      el.loop = type === 'bgm'
      el[control]().catch((e) => e && console.log(e))
    })
  }

  play (type, name) {
    return this.control(type, name, 'play')
  }

  pause (type, name) {
    return this.control(type, name, 'pause')
  }
}
