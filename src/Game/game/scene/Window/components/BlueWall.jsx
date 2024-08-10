export default {
  render() {
    return (
      <>
        <div
          size={{ width: this.$config.screen.width, height: 1 }}
          backgroundImage="Background/blueWall.png"
        ></div>
        <div
          position={{ y: this.$config.screen.height - 1 }}
          size={{ width: this.$config.screen.width, height: 1 }}
          backgroundImage="Background/blueWall.png"
        ></div>
        <div
          position={{ y: 1 }}
          size={{ width: 1, height: 13 }}
          backgroundImage="Background/blueWall.png"
        ></div>
        <div
          position={{ x: this.$config.screen.width - 1, y: 1 }}
          size={{ width: 1, height: 13 }}
          backgroundImage="Background/blueWall.png"
        ></div>
      </>
    );
  },
};
