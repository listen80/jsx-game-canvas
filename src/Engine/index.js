import Render from "./core/Render";
import Resource from "./core/Resource";

import { createNode, patchNode } from "./core/Node";
export { default as Component } from "./core/Component";
import { loadJSON, loadText } from "./utils/http";
import "./core/Control";
import Event from "./event"

export default class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;
    if (this.checkChromeVersion()) {
      loadJSON("config.json").then((game) => {
        this.init(game);
      });
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

    this.$event = (...others) => {
      Event(this.$state, ...others)
    }

    this.$render = new Render(this.$state);
    this.$node = null;
    this.gameStart();
  }

  checkChromeVersion() {
    if (location.protocol === "file:") {
      alert("不能直接运行index.html");
      // } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 86) {
      // alert('需要chrome最新浏览器')
    } else {
      return true;
    }
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
