import { Component } from 'Engine'
import { calcLength } from '../../Engine/utils/string'

const size = 32
export default class Message extends Component {
  create () {
    if (this.props) {
      this.tick = this.props.tick || 90
    }
    this.length = calcLength(this.props.msg)
    this.msg = this.props.msg
  }

  render () {
    this.tick--
    if (this.tick === 0) {
      this.props.onMessageClose()
      return null
    }
    let globalAlpha = 1
    if (this.tick < 15) {
      globalAlpha = this.tick / 15
    }
    const fontSize = 20
    const width = fontSize / 2 * this.length + fontSize
    return (
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,.7)',
          globalAlpha,
          x: (size * 13 - width) / 2,
          height: size,
          width: width,
        }}
      >
        <div style={{ textAlign: 'center', fontSize, x: width / 2, height: size }}>
          {this.msg}
        </div>
      </div>
    )
  }
}
