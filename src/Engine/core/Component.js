import { createNode } from "./Node";

export default class Component {
  constructor({ props, children }) {
    this.props = props;
    this.$children = children;
  }

  $createElement() {
    return createNode.apply(this, arguments);
  }

  createLoop(start = 0, end = 10, interval = 1, delta = 1, loop = false) {
    let n = start;
    let tick = 0;
    return () => {
      if (tick === interval) {
        tick = 0;
        n += delta;
        if (n >= end) {
          if (loop) {
            delta = -delta;
          } else {
            n = start;
          }
        } else if (n <= start) {
          if (loop) {
            delta = -delta;
          } else {
            n = end;
          }
        }
      }
      tick++;
      return n;
    };
  }
}
