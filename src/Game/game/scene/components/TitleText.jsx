export default {
  render() {
    const textProps = {
      text: this.$config.title,
      position: { x: this.$config.screen.width / 2, y: 4 },
      style: {
        font: "128px 楷体",
      },
    };
    return <div {...textProps}></div>;
  },
};
