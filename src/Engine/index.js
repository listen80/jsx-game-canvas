import Render from "./core/Render";
import Loader from "./core/Loader";
import Sound from "./core/Sound";

import { createNode, patchNode } from "./core/Node";

import { loadJSON } from "./utils/http";
import { checkRunTime } from "./utils/ua";

import { hooks, registry } from "../Mota/Hook";

export default class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;
    if (checkRunTime()) {
      loadJSON("config.json")
        .catch(() => alert("config.json不存在"))
        .then((game) => this.init(game));
    } else {
      alert("不能直接运行index.html 或者 Chrome版本太老");
    }
  }

  init(config) {
    document.title = config.title;

    this.$state = {
      config,
      save: config.save,
    };

    this.$render = new Render(this.$state);

    this.$loader = new Loader(this.$state);
    this.$sound = new Sound(config);

    this.$state.$res = this.$loader;
    this.$event = null;
    this.$emit = (...others) => hooks(this.$state, ...others);
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

export { default as Component } from "./core/Component";
