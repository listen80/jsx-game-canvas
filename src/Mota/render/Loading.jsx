import { Component } from 'Engine'

export default class Loading extends Component {
  render () {
    const width = 1 * (18 - 2 * 2)
    const height = 1
    return (
      <div style={{ x: 1 * 2, y: 1 * 2 }}>
        <div style={{ width, height, backgroundColor: 'white' }}></div>
        <div
          style={{
            width: width * this.props.rate || 0,
            height,
            backgroundColor: '#666',
          }}
        ></div>
      </div>
    )
  }
}
