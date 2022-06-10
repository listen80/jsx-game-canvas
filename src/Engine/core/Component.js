import { createNode } from "./Node";

export default class Component {
  constructor({ props, children }) {
    this.props = props;
    this.$node = null;
    this.$children = children;
    this.$sound.play = () => {
      return {
        pause() {},
      };
    };
    this.$sound.pause = () => {};
  }

  $c() {
    return createNode.apply(this, arguments);
  }

  createLoop(start = 0, end = 10, interval = 1) {
    let n = start;
    return () => {
      n += interval;
      if (n >= end) {
        n = end - interval;
        interval = -interval;
      } else if (n < start) {
        n = start;
        interval = -interval;
      }
      return n;
    };
  }

  $sound() {}
}
