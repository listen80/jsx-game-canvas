import { loadSound } from '../utils/http'

export default class Sound {
  constructor (sounds) {
    this.sounds = sounds || Object.create(null)
  }

  control (type, name, control) {
    const current = this.sounds[`${type}/${name}`].cloneNode()
    current.loop = type === 'bgm'
    current[control]()
    return current
  }

  load (sounds) {
    Promise.all(sounds.map(sound => loadSound(`Sound/${sound}`))).then(sounds => {
      sounds.forEach((Sound, i) => (this.sounds[sounds[i]] = Sound))
    })
  }

  play (type, name) {
    return this.control(type, name, 'play')
  }

  pause (type, name) {
    return this.control(type, name, 'pause')
  }
}
