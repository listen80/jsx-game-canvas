import { Component } from "Engine";
import { screenWidth } from "../../../config";

const progressBarWidth = 6;
const progressBarHeight = 0.5;

export default class ProgressBar extends Component {
  styles = {
    progressBarStyle: {
      x: (screenWidth - progressBarWidth) / 2,
      y: 8.75,
      width: progressBarWidth,
      height: progressBarHeight,
      backgroundColor: "#fff",
    },
    progressStyle: {
      width: 0,
      height: progressBarHeight,
      backgroundColor: "#666",
    },
  };

  render() {
    this.styles.progressStyle.width = progressBarWidth * this.props.rate;
    return (
      <div style={this.styles.progressBarStyle}>
        <div style={this.styles.progressStyle}></div>
      </div>
    );
  }
}
