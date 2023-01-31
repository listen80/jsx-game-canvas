export default {
  render() {
    let x = 0;
    return this.$chilren.map((child) => {
      const { height = 1 } = child.attrs?.size || {};
      const rowEle = <div position={{ x }}>{child}</div>;
      x += height;
      return rowEle;
    });
  },
};
