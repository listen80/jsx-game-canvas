export default {
  render() {
    return (
      <>
        <view
          size={{ width: this.$config.screen.width, height: 1 }}
          bgImage="Background/blueWall.png"
        ></view>
        <view
          position={{ y: this.$config.screen.height - 1 }}
          size={{ width: this.$config.screen.width, height: 1 }}
          bgImage="Background/blueWall.png"
        ></view>
        <view
          position={{ y: 1 }}
          size={{ width: 1, height: 13 }}
          bgImage="Background/blueWall.png"
        ></view>
        <view
          position={{ x: this.$config.screen.width - 1, y: 1 }}
          size={{ width: 1, height: 13 }}
          bgImage="Background/blueWall.png"
        ></view>
      </>
    );
  },
};
