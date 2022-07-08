

import { registryComponents, Component } from "Engine"

const getTime = () => performance.now()

export default class FPS extends Component {
  styles = {
    fps: {
      fontSize: 32,
      textAlign: 'left',
      textBaseline: 'top',
    },
  };

  timeStamp = getTime();
  render() {
    const timeStamp = getTime()
    const fps = 1000 / (timeStamp - this.timeStamp)
    this.timeStamp = timeStamp
    return (
      <div style={this.styles.fps}>
        {`${fps.toFixed()}fps`}
      </div>
    )
  }
}
