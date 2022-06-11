import { Component, Animate, Scroll } from "Engine";
import Hero from "./render/Hero"
import { findPath } from "./utils"
export const run = {
  src: "run.png",
  maxTick: 6,
  width: 996 / 6 / 32,
  height: 824 / 8 / 32,
};

export const stand = {
  src: "stand.png",
  maxTick: 4,
  width: 632 / 4,
  height: 768 / 8,
};

export const skill = {
  src: "skill.png",
  maxTick: 6,
  width: 912 / 6,
  height: 800 / 8,
  loop: false,
};

export const fire = {
  src: "fire.png",
  maxTick: 9,
  width: 2907 / 9,
  height: 360 / 1,
  loop: false,
};

export const fireFlys = {
  src: "fireFlys.png",
  maxTick: 9,
  width: 735 / 7,
  height: 98,
  loop: false,
};
const mockMap = {
  width: 13,
  height: 13,
  map: [
    [],
    [],
    [],
    [],
    [, , , , 1, 32, 22, 23, 3],
    [],
    [],
    [, , , , , , 4, 4, 4, 4],
    [],
    [],
    [, , , , 1, 32, 22, 23, 3],
    [],
    [1],

  ]
}

function transform($state, value, x, y) {
  const info = $state.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  const maxTick = {
    animates: 4,
    terrains: 1,
    items: 1,
    npcs: 2,
    enemys: 2,
  }[type]
  const data = {
    src: type,
    sy: detail.sy,
    x: x,
    y: y,
    maxInterval: 30,
    maxTick,
  }

  return data
}


export default class Test extends Component {

  styles = {
    wrap: {
      height: 13,
      width: 13,
      borderColor: 'red',
      borderwidth: 2,
      backgroundColor: '#ccc',
      // backgroundImage: 'ground.png',
    }
  }
  onKeyDown = ({ code }) => {
    this.data.x = 200;
  };

  create() {
    this.data = run;
    this.data.x = 0;
    this.data.sy = 2;
  }
  // onClick = (e) => {
  //   const path = findPath(this.$state.save.position, { x: e.gameX, y: e.gameY, }, mockMap)
  //   this.path = path

  //   // console.log(,)
  //   // console.log(e)
  // }
  renderMap() {
    return mockMap.map.map((line, y) => line.map((value, x) => value ? <Animate data={transform(this.$state, value, x, y)}></Animate> : null));
  }
  render() {
    if (this.path && this.path.length) {
      const path = this.path.pop()
      const { x, y, sy } = path;
      this.$state.save.position.x = x;
      this.$state.save.position.y = y;
      this.$state.save.position.sy = sy;
    }
    return (
      <div style={this.styles.wrap} onClick={this.onClick}>
        {this.renderMap()}
        <Hero />
      </div>
    );
  }
}
