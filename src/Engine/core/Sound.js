import { loadSound } from '../utils/http'

export default class Sound {
  constructor (sounds) {
    this.sounds = sounds || Object.create(null)
  }

  control (type, name, control) {
    const current = this.sounds[`${type}/${name}`].cloneNode()
    // const current = new Audio()
    // current.src = `${type}/${name}`
    current.loop = type === 'bgm'
    current[control]()
    return current
  }

  load(sounds) {
    const loadSounds = (data) => {
      return Promise.all(data.map(sound => loadSound(`Sound/${sound}`))).then(sounds => {
        sounds.forEach((Sound, i) => (this.sounds[data[i]] = Sound))
      })
    }
    
    const loaderMusic = () => Promise.all([loadSounds(sounds)])
    return loaderMusic()
  }

  play (type, name) {
    return this.control(type, name, 'play')
  }

  pause (type, name) {
    return this.control(type, name, 'pause')
  }
}
