export default {
  onCreate() {
    const { width, height } = this.$config.screen;

    this.wrapProps = {
      size: { width, height },
      backgroundColor: "rgba(0,0,0,0.4)",
    };
  },
  render() {
    if (this.props.show) {
      return <div {...this.wrapProps}>{this.$children}</div>;
    }
  },
};
