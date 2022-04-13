import Render from './core/Render'
import Sound from './core/Sound'
import Images from './core/Images'
import Data from './core/Data'
import Font from './core/Font'

import { createNode, patchNode } from './core/Node'
export { Component, KeyEventComponent } from './core/Component'

export default class Engine {
  constructor ($game) {
    if (this.checkChromeVersion()) {
      this.$state = Object.create(null)
      this.$data = new Data()
      this.$sound = new Sound()
      this.$images = new Images()
      this.$font = new Font()
      this.$ui = new Render(this)
      this.$root = null
      this.$game = $game
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
    this.$root = patchNode(this.$root, createNode.call(this, this.$game, null))
    this.$ui.render(this.$root)
  }
}
