import { Component } from "Engine";

export default class Dialog extends Component {
  styles = {
    wrap: {
      width: 20,
      height: 13,
      // backgroundColor: "rgba(0,0,0,0.4)",
    },
  };

  render() {
    const { styles } = this;
    return <div style={styles.wrap}>{this.$children}</div>;
  }
}
