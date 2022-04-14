import { Component } from 'Engine'
const size = 32

export default class Loading extends Component {
  tick = 0;
  render () {
    const width = size * 13
    const height = size
    this.tick += 0.001
    if (this.tick > 1) {
      this.tick = 1
    }
    return (
      <div>
        <div style={{ width, height, backgroundColor: 'white' }}></div>
        <div
          style={{
            width: (width * this.tick),
            height,
            backgroundColor: '#666',
          }}
        ></div>
      </div>
    )
  }
}
