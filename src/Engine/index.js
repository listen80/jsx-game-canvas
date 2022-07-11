import Render from "./core/Render";
import Resource from "./core/Resource";

import { createNode, patchNode, registryComponents } from "./core/Node";

import { loadJSON } from "./utils/http";
import { checkChromeVersion } from "./utils/ua";

import { hooks, registry } from "./core/Hook"
import Component from "./core/Component"
export * as utils from "./utils/format"

export default class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;
    this.Component = Component
    checkChromeVersion()
      ? loadJSON("config.json").catch(() => alert('config.json不存在')).then((game) => this.init(game))
      : alert("不能直接运行index.html")
  }

  init(config) {
    registryComponents({ Component })
    document.title = config.title;

    this.$state = {
      config,
      save: Object.create(null),
      image: Object.create(null),
      sound: Object.create(null),
    };
    this.$state.$res = new Resource(this.$state);
    this.$hook = (...others) => hooks(this.$state, ...others)
    this.$registry = registry
    this.$render = new Render(this.$state);
    this.$node = null;
    this.gameStart();
  }

  gameStop() {
    cancelAnimationFrame(this.ident);
    this.ident = -1;
  }

  gameStart() {

    const next = () => {
      requestAnimationFrame(() => {
        this.keyFrame()
        next()
      })
    }
    next()
    // this.ident = setInterval(() => {
    //   // try {
    //     this.keyFrame();
    //   // } catch (e) {
    //   //   console.log(e)
    //   //   clearInterval(this.ident)
    //   // }
    // }, 16)
  }

  keyFrame() {
    this.$node = patchNode(this.$node, createNode.call(this, this.$gameJSX));
    this.$render.render(this.$node);
  }
}

export { default as Component } from "./core/Component";
export { registryComponents } from "./core/Node";
export { findPath } from "./utils/physics"