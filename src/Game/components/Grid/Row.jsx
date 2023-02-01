export default {
  render() {
    let x = 0;
    return this.$children.map((child) => {
      const { width = 1 } = child.attrs?.size || {};
      const rowEle = <div position={{ x }}>{child}</div>;
      x += width;
      return rowEle;
    });
  },
};
