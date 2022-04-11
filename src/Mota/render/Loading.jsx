import { Component } from 'Engine'
export default class Loading extends Component {
  step = 1
  angle = -this.step
  render () {
    this.angle += this.step
    if (this.angle > 180) {
      this.angle = 0
    }
    const sAngle = this.angle * 2 - 90
    const eAngle = Math.sin(this.angle / 180 * Math.PI) * 45
    const width = 32 * (13 + 5)
    const height = 32 * 13
    return <div style={{ x: 0, y: 0, width, height }}>
      {this.props.msg}
      <circle cx={width / 2} cy={height / 2} r={32 * 3} sAngle={sAngle - eAngle} eAngle={sAngle + eAngle} stroke="#4e6ef2" strokeWidth={10} />
    </div>
  }
}
