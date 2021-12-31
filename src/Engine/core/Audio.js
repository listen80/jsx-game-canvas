export default class Audio {
  current = null
  constructor (audioes) {
    this.audioes = audioes || window.$res.sounds
  }

  control (type, name, control) {
    this.audioes = window.$res.sounds
    this.current = this.audioes[`${type}/${name}`]
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
