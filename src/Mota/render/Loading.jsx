import { Component } from 'Engine'
const size = 32

export default class Loading extends Component {
  constructor() {
    super(...arguments)
    console.log(this.$images)
  }
  render () {
    const width = size * (18 - 2 * 2)
    const height = size
    return (
      <div style={{ x: size * 2, y: size * 2 }}>
        <div style={{ width, height, backgroundColor: 'white' }}></div>
        <div
          style={{
            width: width * this.props.tick / 100,
            height,
            backgroundColor: '#666',
          }}
        ></div>
      </div>
    )
  }
}
