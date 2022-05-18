import Render from "./core/Render";
import Resource from "./core/Resource";

import { createNode, patchNode } from "./core/Node";
export { default as Component } from "./core/Component";
export { default as Animate } from "./components/Animate";
export { default as Scroll } from "./components/Scroll";
export { default as Select } from "./components/Select";
export { default as Table } from "./components/Table";
import { loadJSON, loadText } from "./utils/http";
import "./core/Control";
import { loadGame, saveGame } from "./utils/sl";

export default class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;
    if (this.checkChromeVersion()) {
      loadJSON("game.json").then((game) => {
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
      sound: {}
    };

    this.$res = new Resource(this.$state);

    this.$event = async (key, data) => {
      if (typeof key === typeof null) {
        data = key.data
        key = key.type
      }
      switch (key) {
        case "startGame":
          Object.assign(this.$state.save, this.$state.config.save)
          this.$res.loadMap(this.$state.save.mapId);
          // this.map = loadMap(this.$state.save.mapId);
          // this.$state.randMapKey = `${this.$state.save.mapId} ${new Date()}`;
          break;

        case "loadGame":
          Object.assign(this.$state.save, loadGame())
          this.$res.loadMap(this.$state.save.mapId);
          break;

        case "saveGame":
          saveGame(this.$state.save)
          break;

        case "toTitle":
          this.$state.map = null;
          break;

        case "loadMap":
          this.$state.save.mapId = data
          this.$res.loadMap(this.$state.save.mapId);
          break;

        case "message":
          this.$state.message = data;
          break;

        case "messageClose":
          this.$state.message = null;
          break;
      }

    };

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
    const frame = () => {
      this.keyFrame();
      this.ident = requestAnimationFrame(frame);
    };
    frame();
  }

  keyFrame() {
    this.$node = patchNode(this.$node, createNode.call(this, this.$gameJSX, null));
    this.$render.render(this.$node);
  }
}
