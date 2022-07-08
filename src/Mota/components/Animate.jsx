import { Component } from "Engine";

export default class Animate extends Component {
  loop = this.createLoop(0, this.props.maxTick, this.props.maxInterval)
  render() {
    const { src, x = 0,y = 0, width = 1,  height = 1,  center = false,  sy = 0, ...others } = this.props
    const sx = this.loop()
    return (
      <img
        onMouseDown={this.onMouseDown}
        src={src}
        style={{
          ...others,
          x: x + (center ? -width / 2 : 0),
          y: y + (center ? -height / 2 : 0),
          sx: sx * width,
          sy: height * sy,
          width: width,
          height: height,
        }}
      ></img>
    )
  }
}
