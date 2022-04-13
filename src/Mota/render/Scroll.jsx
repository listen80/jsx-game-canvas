import { Component } from 'Engine'

export default class Scroll extends Component {
  create () {
    this.clientHeight = 32 * 5
    this.scrollHeight = name.length * 32
    this.activeIndex = 0
    this.offsetY = 0
    this.ani = 1
    this.step = 0
  }

  setActive (i) {
    this.activeIndex = i
    this.props.onChange(i)
  }

  wheel (event) {
    const rate = 8
    const min = this.clientHeight - this.scrollHeight
    this.offsetY += event.deltaY > 0 ? rate : -rate
    if (this.offsetY > 0) {
      this.offsetY = 0
    } else if (this.offsetY < min) {
      this.offsetY = min
    }
  }

  render () {
    this.step++
    if (this.step === 10) {
      this.step = 0
      this.ani = !this.ani
    }
    const style = {
      height: this.clientHeight,
      width: 32 * 9,
      backgroundColor: '#abd',
      overflow: 'auto',
    }
    return (
      <div style={style} onWheel={this.wheel}>
        {[].map((name, index) => {
          const height = 32
          const y = index * height + this.offsetY
          if (y + height <= 0 || y > this.clientHeight) {
            return null
          }
          const style = {
            x: 0,
            y,
            height: height,
            width: 32 * 5,
            fontSize: 40,
          }
          return (
            <div style={style} onClick={() => this.setActive(index)}>
              <img
                style={{
                  width: 32,
                  height: 32,
                  sx: (this.ani ? 1 : 0) * 32,
                  sy: index * 32,
                }}
                src="npcs.png"
              ></img>
            </div>
          )
        })}
      </div>
    )
  }
}
