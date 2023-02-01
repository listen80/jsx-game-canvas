export default {
  getProgressOn() {
    const { $loader, $config } = this;

    const x = $config.screen.width / 2;
    const y = 9;

    const width = 7;
    const height = 0.2;

    this.progressBar = {
      align: "center",
      position: {
        x,
        y: y - height / 2,
      },
      size: {
        width,
        height,
        backgroundColor: "#fff",
      },
    };

    this.progress = {
      size: {
        width: (width * $loader.loaded) / $loader.total,
        height,
      },
      backgroundColor: "#666",
    };
  },

  render() {
    this.getProgressOn();
    const { progressBar, progress } = this;

    return (
      <div {...progressBar}>
        <div {...progress}></div>
      </div>
    );
  },
};
