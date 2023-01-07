import { Component } from 'Engine'

const x = 6
const width = 18 - 2 * x
const height = 0.5

export default class Loading extends Component {
  styles = {
    loadFontStyle: {
      y: 4,
      x: 9,
      textAlign: 'center',
      fontSize: 128,
    },
    wrapStyle: {
      x: x,
      y: 8,
      width,
      height,
      backgroundColor: '#fff',
    },
    progressStyle: {
      height,
      backgroundColor: '#666',
    },
  };

  render () {
    return (
      <div>
        <div style={this.styles.loadFontStyle}>Loading</div>
        <div style={this.styles.wrapStyle}>
          <div
            style={{
              ...this.styles.progressStyle,
              ...{ width: width * this.props.rate || 0 },
            }}
          ></div>
        </div>
      </div>
    )
  }
}
