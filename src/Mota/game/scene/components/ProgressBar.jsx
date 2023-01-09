import { Component } from "Engine";
import { screenWidth } from "../../../config";

const progressBarWidth = 7;
const progressBarHeight = 0.2;

export default class ProgressBar extends Component {
  styles = {
    progressBarStyle: {
      x: (screenWidth - progressBarWidth) / 2,
      y: 8.9,
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
