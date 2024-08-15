import { findPath } from "../../utils/physics";
import Animate from "#/Base/Animate";

export default {
  onCreate() {
    this.moving = false;
    this.$event.on("setPath", ($state, data) => {
      this.setPath(data);
    });
  },

  setPath({ dist, map }) {
    this.map = map;
    this.dist = dist;
    this.needFind = true;
  },

  runSteps() {
    if (this.current) {
      this.runOneStep();
      return;
    }
    const map = this.props.map;
    if (this.needFind) {
      const { x, y } = this.dist;
      this.path = findPath(this.$state.save.position, { x, y }, this.map);
      this.needFind = false;
    }

    if (this.path && this.path.length) {
      const path = this.path.pop();
      const { x, y, sy } = path;
      if (map[y][x]) {
        // this.props.terrains[y][x].$context.onZhuangji(this);
        this.$state.save.position.sy = sy;
      } else {
        this.current = path;
        this.loop = this.createLoop(1 / 4, 1 + 1 / 4, 1, 1 / 4);
        this.runOneStep();
        // this.$state.save.position.x = x;
        // this.$state.save.position.y = y;
        this.$state.save.position.sy = sy;
      }
    }
  },

  runOneStep() {
    const a = this.loop();
    this.$state.save.position.x += (1 / 4) * Math.cos(this.current.rad);
    this.$state.save.position.y += (1 / 4) * Math.sin(this.current.rad);
    if (a === 1) {
      this.current = null;
    }
  },

  render() {
    // this.runSteps();
    return (
      <div
        image={"Characters/hero.png"}
        position={{
          x: 5,
          y: 11,
        }}
        size={{
          width: 1,
          height: 1,
        }}
      ></div>
    );
  },
};
