export default {
  render() {
    let y = 0;
    const { render = [], ...others } = this.props;
    return (
      <view {...others}>
        {render.map((child) => {
          if (!child) {
            return null;
          }
          const { height = 1 } = {};
          const rowEle = <view position={{ y }}>{child}</view>;
          y += height;
          return rowEle;
        })}
      </view>
    );
  },
};
