import { Component } from 'Engine'
import { calcLength } from '../../Engine/utils/string'

export default class Message extends Component {
  create () {
    if (this.props) {
      this.tick = this.props.tick || 90
    }
    this.length = calcLength(this.$state.msg)
    this.msg = this.$state.msg
  }

  render () {
    this.tick--
    if (this.tick === 0) {
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
          x: (1 * 18 - width) / 2,
          y: 1 * 2,
          height: 1,
          width: width,
        }}
      >
        <div style={{ textAlign: 'center', fontSize, x: width / 2, height: 1 }}>
          {this.msg}
        </div>
      </div>
    )
  }
}
