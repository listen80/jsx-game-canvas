

export default class Dialog extends Component {
  onCreate() {
    const { width, height } = this.$config.screen;

    this.styles = {
      wrap: {
        backgroundColor: "rgba(0,0,0,0.4)",
        width,
        height,
      },
    };
  }

  render() {
    const { styles } = this;
    if (this.props.show) {
      return <div style={styles.wrap}>{this.$children}</div>;
    }
  }
}
