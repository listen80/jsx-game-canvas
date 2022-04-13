import { Component } from 'Engine'
import { calcLength } from '../../Engine/utils/string'

export default class Message extends Component {
  create () {
    if (this.props) {
      this.tick = this.props.tick || 120
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
    if (this.tick < 30) {
      globalAlpha = this.tick / 30
    }
    const fontSize = 18
    const style = {
      textAlign: 'left',
      fontSize,
      backgroundColor: 'rgba(0,0,0,.7)',
      globalAlpha,
      x: 0,
      y: 0,
      height: 32,
      width: (fontSize / 2) * this.length + 10,
    }
    return (
      <div style={style}>
        <div style={{ x: 5, height: 32 }}>{this.msg}</div>
      </div>
    )
  }
}
