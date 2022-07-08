
import { registryComponents, Component } from "Engine"

export default class Loading extends Component {
  render() {
    const loadFontStyle = {
      y: 4,
      x: 9,
      textAlign: 'center',
      fontSize: 128
    }

    const x = 6;
    const width = (18 - 2 * x)
    const height = 0.5
    const wrapStyle = {
      x: x,
      y: 8,
      width,
      height,
      backgroundColor: '#fff'
    }
    const progressStyle = {
      width: width * this.props.rate || 0,
      height,
      backgroundColor: '#666',
    }
    return (
      <div>
        <div style={loadFontStyle}>Loading</div>
        <div style={wrapStyle}><div style={progressStyle}></div></div>
      </div>
    )
  }
}
