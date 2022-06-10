import Component from '../core/Component'

export default class Animate extends Component {
  create() {
    // debugger
  }
  onClick = () => {
    const { events } = this.props
    if (events) {
      console.log(this)
      this.$event('mapLoad', events[0].data)
    }
  }
  loop = this.createLoop(0, this.props.data.maxTick, this.props.data.maxInterval)
  render() {
    const {
      src,
      x = 0,
      y = 0,
      width = 1,
      height = 1,
      center = false,
      sy = 0,
    } = this.props.data
    const sx = this.loop()
    return (
      <img
        onClick={this.onClick}
        src={src}
        style={{
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
