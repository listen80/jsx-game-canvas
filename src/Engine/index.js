import Render from "./core/Render";
import Loader from "./core/Loader";
import Sound from "./core/Sound";
import EventEmitter from "./core/EventEmitter";

import { createNode, patchNode } from "./core/Node";

import { hooks, registry } from "../Mota/Hook";
export { default as Component } from "./core/Component";

export default class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;
    this.$loader = new Loader();
    if (this.checkRunTime()) {
      this.$loader
        .loadConfig()
        .catch((error) => alert("config.json不存在" + error))
        .then((config) => this.init(config));
    } else {
      alert("不能直接运行index.html 或者 Chrome版本太老");
    }
  }

  checkRunTime() {
    if (location.protocol === "file:" || !navigator.userAgentData) {
      return false;
    } else {
      return true;
    }
  }

  init(config) {
    document.title = config.title;

    this.$state = {
      save: config.save,
    };

    this.$loader.init(config);

    this.$render = new Render(config, this.$loader);
    this.$sound = new Sound(config, this.$loader);

    this.$event = new EventEmitter({
      $state: this.$state,
      $render: this.$render,
      $sound: this.$sound,
    });

    this.$emit = (...others) =>
      hooks(this.$state, this.$loader, this.$sound, ...others);
    this.$on = registry;

    this.$node = null;
    this.gameStart();
  }

  gameStop() {
    cancelAnimationFrame(this.ident);
  }

  gameStart() {
    const next = () => {
      this.ident = requestAnimationFrame(() => {
        this.keyFrame();
        next();
      });
    };
    next();
  }

  keyFrame() {
    this.$node = patchNode(this.$node, createNode.call(this, this.$gameJSX));
    this.$render.render(this.$node);
  }
}
