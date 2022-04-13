import { Component } from 'Engine'
const size = 32

export default class Loading extends Component {
  step = 1;
  angle = -this.step;
  render () {
    this.angle += this.step
    if (this.angle > 180) {
      this.angle = 0
    }
    const sAngle = this.angle * 2 - 90
    const eAngle = Math.sin((this.angle / 180) * Math.PI) * 45
    const width = size * (13 + 5)
    const height = size * 13
    return (
      <div style={{ x: 0, y: 0, width, height }}>
        {this.props.msg}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={size * 3}
          sAngle={sAngle - eAngle}
          eAngle={sAngle + eAngle}
          stroke="#4e6ef2"
          strokeWidth={10}
        />
      </div>
    )
  }
}
