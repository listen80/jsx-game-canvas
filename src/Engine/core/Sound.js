export default class Sound {
  current = null
  constructor (Soundes) {
    this.Soundes = Soundes || window.$res.sounds
  }

  control (type, name, control) {
    this.Soundes = window.$res.sounds
    this.current = this.Soundes[`${type}/${name}`]
    this.current.loop = type === 'bgm'
    this.current[control]()
  }

  play (type, name) {
    this.control(type, name, 'play')
  }

  pause (type, name) {
    this.control(type, name, 'pause')
  }
}
