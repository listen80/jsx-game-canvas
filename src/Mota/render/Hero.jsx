import { Component } from "Engine";

import { findPath } from "../utils"


export default class Hero extends Component {
  onMouseDown = (e) => {
    const { gameX: x, gameY: y } = e
    // if (this.$state.map.mapTerrains[y][x]) {
    //   console.log(this.$state.map.mapTerrains[y][x])
    //   return
    // }
    const path = findPath(this.$state.save.position, { x, y }, this.$state.map)
    this.path = path
    console.log(JSON.stringify(path))

  }

  runSteps() {
    if (this.path && this.path.length) {
      const path = this.path.pop()
      const { x, y, sy } = path;
      this.$state.save.position.x = x;
      this.$state.save.position.y = y;
      this.$state.save.position.sy = sy;
    }
  }
  render() {
    this.runSteps()
    const wrapStyl = {
      width: 13,
      height: 13,
    }
    const data = {
      src: "Characters/hero.png",
      width: 1,
      height: 1,
      maxTick: 4,
      maxInterval: 10,
      sy: this.$state.save.position.sy,
    }
    return (
      <div onMouseDown={this.onMouseDown}>
        <div style={this.$state.save.position}>
          <animate
            {...data}
          ></animate>
          {/* <animate
            data={{
              x: 2,
              y: -2,
              src: "Characters/hero.png",
              width: 1,
              height: 2,
              swidth: 1,
              sheight: 1,
              maxTick: 4,
              maxInterval: 10,
              sy: this.$state.save.position.sy,
            }}
          ></animate> */}
        </div>
      </div>
    );
  }
}
