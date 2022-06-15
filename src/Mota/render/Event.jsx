import { Component } from "Engine";

function transform($state, value, x, y) {
  const info = $state.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  let maxTick = 1
  const data = {
    src: type,
    sy: detail.sy,
    // x: x,
    // y: y,
    maxInterval: 10,
  }
  if (type === "animates") {
    maxTick = 4
  } else if (type === "terrains" || type === "items") {
    maxTick = 1
  } else if (type === "npcs" || type === "enemys") {
    maxTick = 2
  }
  if (type === "enemys") {
    const enemy = mota.$node.$context.$state.enemys[name]
    data.enemy = enemy
    maxTick = 2
  }
  data.maxTick = maxTick
  return data
}

export default class Event extends Component {

  onCreate() {
    this.data = transform(this.$state, this.props.value)
  }
  onMouseDown() {
    console.log(this)
  }

  render() {

    return (
      <div style={{ width: 1, height: 1, x: this.props.x, y: this.props.y }}>
        <animate {...this.data}></animate>
        {this.enemy}
      </div>
    );
  }
}
