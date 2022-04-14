import { Component } from 'Engine'
const size = 32

export default class Loading extends Component {
  tick = 0;
  render () {
    const width = size * (18 - 2 * 2)
    const height = size
    this.tick += 0.01
    if (this.tick > 0.95) {
      this.tick = 0.95
    }
    return (
      <div style={{ x: size * 2, y: size * 2 }}>
        <div style={{ width, height, backgroundColor: 'white' }}></div>
        <div
          style={{
            width: width * this.tick,
            height,
            backgroundColor: '#666',
          }}
        ></div>
      </div>
    )
  }
}
