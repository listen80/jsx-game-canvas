import Render from "./core/Render";
import Resource from "./core/Resource";

import { createNode, patchNode, registryComponents } from "./core/Node";

import { loadJSON } from "./utils/http";
import { checkChromeVersion } from "./utils/ua";

import EventHook from "./core/Hook"
import animate from "./components/Animate.jsx";
import select from "./components/Select.jsx";
import table from "./components/Table.jsx";
import scroll from "./components/Scroll.jsx";

registryComponents({ animate, select, table, scroll, })

export default class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;
    if (checkChromeVersion()) {
      loadJSON("config.json").then((game) => {
        this.init(game);
      }).catch(() => alert('config.json不存在'))
    } else {
      alert("不能直接运行index.html")
    }
  }

  init(config) {
    document.title = config.title;

    this.$state = {
      config,
      save: { ...config.save },
      image: {},
      sound: {},
    };
    const $res = new Resource(this.$state);
    this.$state.$res = $res

    this.$hook = (...others) => EventHook(this.$state, ...others)
    this.$render = new Render(this.$state);
    this.$node = null;
    this.gameStart();

    window.$hook = this.$hook
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