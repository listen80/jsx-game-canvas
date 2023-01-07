import { Component } from "Engine";
import { screenWidth } from "../config";

export default class Dialog extends Component {
  styles = {
    wrap: {
      width: screenWidth,
      height: 13,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
  };

  render() {
    const { styles } = this;
    return <div style={styles.wrap}>{this.$children}</div>;
  }
}
