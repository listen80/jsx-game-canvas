import Progress from "./Progress";

export default {
  render() {
    const textProps = {
      position: { x: this.$config.screen.width / 2, y: 4 },
      text: this.$config.title,
      style: {
        font: "128px 楷体",
      },
    };
    return (
      <div>
        <div {...textProps}></div>
        <Progress />
      </div>
    );
  },
};
