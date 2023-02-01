export default {
  getProgressOn() {
    const x = this.$config.screen.width / 2;
    const y = 9

    const width = 7;
    const height = 0.2;

    this.data = {
      progressBar: {
        align: "center",
        position: {
          x,
          y: y - height / 2,
        },
        size: {
          width,
          height,
        },
        backgroundColor: "#fff",
      },
      progress: {
        size: {
          width: width * this.props.rate,
          height,
        },
        backgroundColor: "#666",
      },
    };
  },

  render() {
    this.getProgressOn();
    const { progressBar, progress } = this.data;

    return (
      <div {...progressBar}>
        <div {...progress}></div>
      </div>
    );
  },
};
