import Progress from "./Progress";

export default {
  onCreate() {
    this.textProps = {
      position: { x: this.$config.screen.width / 2, y: 4 },
      text: "Loading",
      style: {
        font: "128px 楷体",
      },
    };
  },
  render() {
    return (
      <>
        <view {...this.textProps}></view>
        <Progress />
      </>
    );
  },
};
