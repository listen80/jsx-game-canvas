import { Component } from 'Engine'
const size = 32
export default class FPS extends Component {
  styles = {
    fps: {
      fontSize: 14,
      textAlign: 'right',
      textBaseline: 'top',
      height: size,
      x: size * 18,
    },
  };

  static getTime = () => performance.now()

  timeStamp = FPS.getTime();
  render () {
    const timeStamp = FPS.getTime()
    const fps = 1000 / (timeStamp - this.timeStamp)
    this.timeStamp = timeStamp
    return (
      <div style={this.styles.fps}>
        {`${fps.toFixed()}fps`}
      </div>
    )
  }
}
