import { Component } from 'Engine'

export default class Loading extends Component {
  render() {
    const x = 6;
    const width = 1 * (18 - 2 * x)
    return (
      <div>
        <div style={{ y: 2, width: 18, color: 'rebeccapurple', textAlign: 'center', fontSize: 64 }}>游戏引擎</div>
        <div
          style={{
            x: x,
            y: 5,
            width: width * this.props.rate || 0,
            height: 0.2,
            backgroundColor: '#666',
          }}
        ></div>
      </div>
    )
  }
}
