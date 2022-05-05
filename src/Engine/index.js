import Render from "./core/Render";
import Sound from "./core/Sound";
import Images from "./core/Images";
import Data from "./core/Data";
import Font from "./core/Font";
import Resource from "./core/Resource";

import { createNode, patchNode } from "./core/Node";
export { Component } from "./core/Component";
export { default as Animate } from "./components/Animate";
export { default as Scroll } from "./components/Scroll";
export { default as Select } from "./components/Select";
export { default as Table } from "./components/Table";
import { loadJSON, loadText } from "./utils/http";
import "./core/Control"
import { loadGame } from "./utils/sl";

export default class Engine {
  constructor($game) {
    this.$game = $game;
    if (this.checkChromeVersion()) {
      loadJSON("game.json").then((game) => {this.init(game)});
    }
  }

  init(config) {
    this.$config = config
    document.title = config.title
    this.$state = Object.create(null)
    this.$save = Object.create(null)
    this.$res = new Resource(config);
    this.$root = this
    this.$event = (key, data) => {
      console.log(key, data)
      if (key === 'loadMap') {
        this.$res.loadMap(data)
        // this.map = await loadMap(this.$data.save.mapId)
        // this.randMapKey = `${this.$data.save.mapId} ${new Date()}`
      } else if (key === 'loadGame') {
        this.$res.loadMap('MT0').then((data) => {
          this.$state.map = data
          this.$save
        })
      }
    }
    // this.$sound = new Sound();
    // this.$images = new Images();
    // this.$font = new Font();
    this.$render = new Render(this);
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
    const frame = () => {
      this.keyFrame();
      this.ident = requestAnimationFrame(frame);
    };
    frame();
  }

  keyFrame() {
    this.$node = patchNode(this.$node, createNode.call(this, this.$game, null));
    this.$render.render(this.$node);
  }
}
