import UI from './core/UI'
import Audio from './core/Audio'
import { createNode } from './core/createNode'
import { patchNode } from './core/patchNode'
export default class Engine {
  constructor (Game) {
    if (this.check()) {
      this.$resource = Object.create(null)
      this.$state = Object.create(null)
      this.Game = createNode(Game, null)
      this.$foucs = null
      this.$audio = new Audio()
      window.$audio = this.$audio
      this.ui = new UI()
      this.gameStart()
    }
  }

  check () {
    if (location.protocol === 'file:') {
      alert('不能直接运行index.html')
    } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 88) {
      alert('需要chrome最新浏览器')
    } else {
      return true
    }
  }

  gameStop () {
    cancelAnimationFrame(this.ident)
    this.ident = -1
  }

  gameStart () {
    const frame = () => {
      this.keyFrame()
      this.ident = requestAnimationFrame(frame)
    }
    frame()
  }

  keyFrame () {
    this.root = patchNode(this.root, this.Game, this.ui)
    this.ui.render(this.root)
  }
}
