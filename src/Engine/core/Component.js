import { createNode } from "./Node";

export default class Component {
  constructor({ props, children }) {
    this.props = props;
    this.$node = null;
    this.$children = children;
    this.$sound.play = () => {
      return {
        pause() { },
      };
    };
    this.$sound.pause = () => { };
  }

  $c() {
    return createNode.apply(this, arguments);
  }

  createNodeByConfig(config) {
    if (typeof config === 'string') {
      return config
    }
    const { tag = 'div', props, children = [] } = config
    return this.$c(tag, props, ...children.map((c) => this.createNodeByConfig(c)))
  }

  updateSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => this.updateSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? this.$state.save[context] : this.$state.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === "object") {
      this.updateSaveData(context, Object.entries(gets));
    } else {
      // console.error(gets, n)
    }
  }

  checkSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      return gets.some(([id, value]) => this.checkSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? this.$state.save[context] : this.$state.save;
      saveData[gets] = saveData[gets] || 0;
      return saveData[gets] + Number(n) >= 0;
    } else if (typeof gets === "object") {
      return this.checkSaveData(context, Object.entries(gets), null, 0);
    } else {
      return false;
    }
  }

  createLoop(start = 0, end = 10, interval = 1, delta = 1) {
    let n = start;
    let tick = 0;
    return () => {
      tick++;
      if (tick === interval) {
        tick = 0;
        if (interval) {
          n += delta;
          if (n >= end) {
            n = end - delta;
            delta = -delta;
          } else if (n < start) {
            n = start;
            delta = -delta;
          }
        }
      }
      return n;
    };
  }

  $sound() { }
}

