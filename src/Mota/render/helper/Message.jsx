import { Component } from 'Engine'
export function calcLength (str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}

export function splitStringByWidth (str, w) {
  let len = 0
  let start = 0
  const re = []
  let i = 0
  for (; i < str.length; i++) {
    let c = 0
    if (str.charCodeAt(i) > 127) {
      c = 2
    } else {
      c = 1
    }
    len += c
    if (len > w) {
      re.push(str.substring(start, i))
      start = i
      len = c
    }
  }
  re.push(str.substring(start, i))
  return re
}


export default class Message extends Component {
  messages = []
  tempMessages = []
  onCreate() {
    this.$hook.registry('setMessage', ($state, data) => {
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
