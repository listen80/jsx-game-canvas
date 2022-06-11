import { Component } from "Engine";

import Shop from "./Shop";
import Battle from "./Battle";
import Talks from "./Talks";
import EnemyInfo from "./EnemyInfo";
import ShopList from "./ShopList";
import Animate from "../../Engine/components/Animate";

import { findPath } from "../utils"


export default class Hero extends Component {
  onClick = (e) => {
    const path = findPath(this.$state.save.position, { x: e.gameX, y: e.gameY, }, this.$state.map)
    this.path = path
    console.log(path)

    // console.log(,)
    // console.log(e)
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
    return (
      <div style={wrapStyl} onClick={this.onClick}>
        <div style={this.$state.save.position}>
          <Animate
            data={{
              src: "Characters/hero.png",
              width: 1,
              height: 1,
              maxTick: 4,
              maxInterval: 10,
              sy: this.$state.save.position.sy,
            }}
          ></Animate>
          {/* <Animate
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
          ></Animate> */}
        </div>
      </div>
    );
  }
}
