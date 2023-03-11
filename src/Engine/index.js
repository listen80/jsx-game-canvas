import Render from './core/Render'
import Loader from './core/Loader'
import Sound from './core/Sound'
import EventEmitter from './core/EventEmitter'

import { createNode, patchNode } from './core/Node'

export default class Engine {
  constructor ($app) {
    this.$app = $app
    if (this.checkRunTime()) {
      this.$loader = new Loader()
      this.$loader
        .loadConfig()
        .catch((error) => alert('config.json不存在' + error))
        .then((config) => this.init(config))
    } else {
      alert('不能直接运行index.html 或者 Chrome版本太老')
    }
  }

  checkRunTime () {
    if (location.protocol === 'file:' || !navigator.userAgentData) {
      return false
    } else {
      return true
    }
  }

  init (config) {
    document.title = config.title

    this.$config = config // 游戏配置，不允许更改

    this.$state = { save: Object.create(null) } // 游戏存档，可以修改

    this.$loader.init(config) // 资源加载器

    this.$sound = new Sound(config, this.$loader) // 音频控制器

    this.$render = new Render(config, this.$loader) // 渲染器 + 事件控制器

    this.$event = new EventEmitter({
      $config: this.$config,
      $state: this.$state,
      $loader: this.$loader,
      $sound: this.$sound,
      $render: this.$render,
    })

    this.$root = null
    this.gameStart()
  }

  gameStop () {
    cancelAnimationFrame(this.$requestAnimationId)
  }

  gameStart () {
    const next = () => {
      this.$requestAnimationId = requestAnimationFrame(() => {
        this.keyFrame()
        next()
      })
    }
    next()
  }

  keyFrame () {
    this.$root = patchNode(this.$root, createNode.call(this, this.$app))
    this.$render.render(this.$root) // 渲染开始
  }
}
