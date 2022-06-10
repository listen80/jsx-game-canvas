import { Component } from 'Engine'

export default class Loading extends Component {
  render() {
    const x = 6;
    const width = (18 - 2 * x)
    const height = 0.5
    const wrapStyle = {
      x: x,
      y: 8, width, height, backgroundColor: '#fff'
    }
    const loadingStyle = {
      width: width * this.props.rate || 0,
      height,
      backgroundColor: '#666',
    }
    return (
      <div>
        <div style={{ y: 4, width: 18, textAlign: 'center', fontSize: 128 }}>Loading</div>
        <div style={wrapStyle}>
          <div style={loadingStyle}></div>
        </div>
      </div>
    )
  }
}
