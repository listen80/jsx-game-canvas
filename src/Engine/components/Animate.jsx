import Component from '../core/Component'

export default class Animate extends Component {
  interval = -1;
  tick = 0;
  create() {
    debugger
  }
  render () {
    const {
      src,
      x = 0,
      y = 0,
      width = 1,
      height = 1,
      maxTick = 1,
      maxInterval = 10,
      center = false,
      sy = 0,
    } = this.props.data
    this.interval++
    if (this.interval === maxInterval) {
      this.interval = 0
      this.tick++
      if (this.tick === maxTick) {
        this.tick = 0
      }
    }
    return (
      <img
        src={src}
        style={{
          x: x + (center ? -width / 2 : 0),
          y: y + (center ? -height / 2 : 0),
          sx: this.tick * width,
          sy: height * sy,
          width: width,
          height: height,
        }}
      ></img>
    )
  }
}
