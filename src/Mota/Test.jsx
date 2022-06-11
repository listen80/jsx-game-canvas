import { Component, Animate, Scroll } from "Engine";
import Hero from "./render/Hero"
import { findPath } from "./utils"

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
  return null
  const info = $state.mapping[value];
  const { type, name } = info;
  const p = $state[type][name];
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
      backgroundImage: 'ground.png',
    }
  }
  onKeyDown = ({ code }) => {
  };

  create() {
  }
  
  renderMap() {
    // return mockMap.map.map((line, y) => line.map((value, x) => value ? <Animate data={transform(this.$state, value, x, y)}></Animate> : null));
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
