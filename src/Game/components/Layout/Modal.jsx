export default {
  onCreate() {
    const { width, height } = this.$config.screen;

    this.wrapProps = {
      size: { width, height },
      bgColor: "rgba(0,0,0,0.4)",
    };
    this.closeButtonProps = {
      text: "X",
      size: {
        height: 1,
        width: 1,
      },
      position: {
        x: 1,
        y: 1,
      },
    };
  },
  render() {
    if (this.props.show) {
      return (
        <div {...this.wrapProps}>
          <div {...this.closeButtonProps}></div>
          {this.children}
        </div>
      );
    }
  },
};
