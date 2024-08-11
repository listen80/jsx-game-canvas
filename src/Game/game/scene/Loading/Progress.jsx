export default {
  onCreate() {
    const { $config } = this;
    const y = 9;
    const width = 7;
    const height = 0.2;

    this.progressBar = {
      align: "center",
      position: {
        x: $config.screen.width / 2,
        y,
      },
      size: {
        width,
        height,
      },
      bgColor: "#fff",
    };

    this.progress = {
      size: {
        height,
      },
      bgColor: "#666",
    };
  },

  getProgressOn() {
    const { $loader } = this;
    const rate = $loader.loaded / $loader.total;
    this.progress.size.width = this.progressBar.size.width * rate;
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
