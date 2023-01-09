import { Component } from 'Engine'

export default class Animate extends Component {
  loop = this.createLoop(0, this.props.maxTick, this.props.maxInterval)
  render () {
    const { image, x = 0, y = 0, width = 1, height = 1, center = false, sy = 0, ...others } = this.props
    const sx = this.loop()
    return (
      <div
        image={image}
        style={{
          ...others,
          x: x + (center ? -width / 2 : 0),
          y: y + (center ? -height / 2 : 0),
          sx: sx * width,
          sy: height * sy,
          width: width,
          height: height,
        }}
      ></div>
    )
  }
}
