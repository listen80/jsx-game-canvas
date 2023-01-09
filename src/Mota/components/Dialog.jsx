import { Component } from "Engine";
import { screenWidth } from "../config";

export default class Dialog extends Component {
  styles = {
    wrap: {
      backgroundColor: "rgba(0,0,0,0.4)",
    },
  };

  onCreate() {
    this.styles.width = screenWidth
    this.styles.height = 13
  }

  render() {
    const { styles } = this;
    if (this.props.show) {
      return <div style={styles.wrap}>{this.$children}</div>;
    }
  }
}
