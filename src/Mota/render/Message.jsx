import { Component } from 'Engine'
import { calcLength } from '../../Engine/utils/string'

export default class Message extends Component {
  messages = []
  tempMessages = []
  onCreate() {
    window.registry('setMessage', ($state, data) => {
      if (!data) {
        return
      }
      const length = calcLength(data)
      const fontSize = 20
      const width = (fontSize / 2 * length + fontSize) / 32
      this.messages.unshift({
        message: data,
        tick: 180,
        width,
      })
    })
  }

  render() {
    this.messages = this.messages.filter((config) => {
      return config.tick--
    })
    return this.messages.map((config, index) => {
      const { message, width } = config
      return (<div
        style={{
          backgroundColor: 'rgba(0,0,0,.7)',
          globalAlpha: config.tick / 180,
          x: (1 * 18 - width) / 2,
          y: 1 * 2 + index * 1.2,
          height: 1,
          width: width,
        }}
      >
        <div style={{ textAlign: 'center', fontSize: 20, x: width / 2, height: 1 }}>
          {message}
        </div>
      </div>)
    })

  }
}
