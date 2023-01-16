export default {
  onCreate() {
    const progressBarWidth = this.props.size || 7;
    const progressBarHeight = this.props.size || 0.2;

    this.attrs = {
      progressBar: {
        align: "center",
        position: {
          x: this.$config.screen.width / 2,
          y: 8.9,
        },
        size: {
          width: progressBarWidth,
          height: progressBarHeight,
        },
        backgroundColor: "#fff",
      },
      progress: {
        size: {
          width: 0,
          height: progressBarHeight,
        },
        backgroundColor: "#666",
      },
    };
  },

  getProgressOn() {
    this.attrs.progress.size.width =
      this.props.rate * this.attrs.progressBar.size.width;
  },

  render() {
    this.getProgressOn();
    const { progressBar, progress } = this.attrs;

    return (
      <div {...progressBar}>
        <div {...progress}></div>
      </div>
    );
  },
};
