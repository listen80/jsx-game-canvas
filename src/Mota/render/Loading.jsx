import { Component } from 'Engine'

export default class Loading extends Component {
  render() {
    const x = 6;
    const width = (18 - 2 * x)
    return (
      <div>
        <div style={{ y: 4, width: 18, textAlign: 'center', fontSize: 128 }}>Loading</div>
        <div
          style={{
            x: x,
            y: 8,
            width: width * this.props.rate || 0,
            height: 0.5,
            backgroundColor: '#666',
          }}
        ></div>
      </div>
    )
  }
}
