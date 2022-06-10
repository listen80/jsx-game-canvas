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

  $sound() {}
}
