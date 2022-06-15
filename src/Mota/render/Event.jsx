import { Component } from "Engine";

function transform($state, value, x, y) {
  const info = $state.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  let maxTick = 1
  const data = {
    src: type,
    sy: detail.sy,
    x: x,
    y: y,
    maxInterval: 10,
  }
  if (type === "animates") {
    maxTick = 4
  } else if (type === "terrains" || type === "items") {
    maxTick = 1
  } else if (type === "npcs" || type === "enemys") {
    maxTick = 2
  }
  data.maxTick = maxTick
  return data
}

export default class Map extends Component {

  onMouseDown() {
    console.log(this)
  }

  render() {
    const data = transform(this.$state, this.props.value, this.props.x, this.props.y)
    return (
      <div>
        <animate {...data}></animate>
      </div>
    );
  }
}
