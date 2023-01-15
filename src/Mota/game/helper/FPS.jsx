export default {
  onCreate() {
    this.props = {
      style: {
        textAlign: "right",
        textBaseline: "top",
      },
      position: {
        x: this.$config.screen.width,
      }
    }
  },
  getFps() {
    const timeStamp = performance.now()
    if (this.timeStamp) {
      this.fps = (1000 / (timeStamp - this.timeStamp)).toFixed()
      this.timeStamp = timeStamp;
    } else {
      this.fps = '-'
    }
  },
  render() {
    this.getFps()
    const { position, style, fps } = this

    return (
      <div
        {...this.props}
        text={`${fps}fps`}
        size={{ height: 4, width: 4 }}
        border={{ borderWidth: 3, borderColor: "red" }}
      ></div>
    );
  },
};
