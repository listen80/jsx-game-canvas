
import { Component } from 'Engine'
export default class FPS extends Component {
  fps = 60
  styles = {
    fps: {
      textAlign: 'left',
      height: 32,
      x: 0,
    },
  }

  timeStamp = +new Date();
  render () {
    const timeStamp = +new Date()
    const fps = (1000 / (timeStamp - this.timeStamp))
    const min = 30
    const warn = this.fps < min && fps < min
    this.fps = fps
    this.timeStamp = timeStamp
    return (
      <div style={this.styles.fps}>
        {warn ? `${this.fps.toFixed()}fps` : null}
      </div>
    )
  }
}
