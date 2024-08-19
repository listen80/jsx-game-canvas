export default {
  render() {
    const { render, columns = 3, columnWidth = 3, ...others } = this.props;
    return (
      <view {...this.props}>
        {render.map((el, index) => {
          const rowIndex = index % columns;
          const columnIndex = (index / columns) | 0;
          return (
            <view position={{ x: rowIndex * columnWidth, y: columnIndex }}>
              {el}
            </view>
          );
        })}
      </view>
    );
  },
};
