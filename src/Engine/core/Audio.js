export default class Audio {
  current = null
  constructor (audioes) {
    this.audioes = audioes || window.$res.sounds
  }

  play (type, name) {
    this.audioes = window.$res.sounds
    if (type === 'bgm') {
      if (this.current) {
        this.current.pause()
      }
    }

    this.current = this.audioes[`${type}/${name}`]
    this.current.loop = true
    this.current.play()
  }
}
