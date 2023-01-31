export default {
  render() {
    let y = 0;
    return this.$chilren.map((child) => {
      const { height = 1 } = child.attrs?.size || {};
      const rowEle = <div position={{ x }}>{child}</div>;
      y += height;
      return rowEle;
    });
  },
};
