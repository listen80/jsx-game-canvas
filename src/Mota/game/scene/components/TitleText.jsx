import { Component } from "Engine";
import { screenWidth } from "../../../config";

export default class Title extends Component {
  styles = {
    titleText: {
      x: screenWidth / 2,
      y: 4,
      textAlign: "center",
      fontSize: 128,
    },
  };

  render() {
    return <div style={this.styles.titleText}>魔塔</div>;
  }
}
