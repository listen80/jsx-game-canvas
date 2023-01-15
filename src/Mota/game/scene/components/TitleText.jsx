export default {
  onCreate() {
    this.textAttrs = {
      text: "魔塔",
      position: { x: this.$config.screen.width / 2, y: 4 },
      style: {
        font: "128px 楷体",
      },
    };
  },

  render() {
    return <div {...this.textAttrs}></div>;
  },
};
