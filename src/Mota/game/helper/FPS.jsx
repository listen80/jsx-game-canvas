import { Component } from "Engine";
import { screenWidth } from "../../config";

const getTime = () => performance.now();

export default class FPS extends Component {
  styles = {
    fps: {
      x: screenWidth,
      fontSize: 32,
      textAlign: "right",
      textBaseline: "top",
    },
  };

  timeStamp = getTime();
  interval = 30;
  tick = 0;

  render() {
    if (this.tick === 0) {
      const timeStamp = getTime();
      this.fps = (1000 / (timeStamp - this.timeStamp)).toFixed();
      this.timeStamp = timeStamp;
    } else {
      this.tick++;
      if (this.tick === this.interval) {
        this.tick = 0;
      }
    }

    return <div style={this.styles.fps}>{`${this.fps}fps`}</div>;
  }
}
