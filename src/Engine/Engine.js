import Render from './core/Render'
import Sound from './core/Sound'
import Images from './core/Images'
import Data from './core/Data'

import { createNode } from './core/node/createNode'
import { patchNode } from './core/node/patchNode'

export default class Engine {
  constructor (Game) {
    if (this.checkChromeVersion()) {
      this.$state = Object.create(null)
      this.$sound = new Sound()
      this.$images = new Images()
      this.$data = new Data()
      this.ui = new Render(this)
      this.Game = createNode.call(this, Game, null)
      this.gameStart()
    }
  }

  checkChromeVersion () {
    if (location.protocol === 'file:') {
      alert('不能直接运行index.html')
    } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 86) {
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
    this.root = patchNode(this.root, this.Game)
    this.ui.render(this.root)
  }
}
