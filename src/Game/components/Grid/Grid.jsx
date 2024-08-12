export default {
  render() {
    const { render, columns = 3, columnWidth = 3, ...others } = this.props;
    return (
      <div {...this.props}>
        {render.map((el, index) => {
          const rowIndex = index % columns;
          const columnIndex = (index / columns) | 0;
          return (
            <div position={{ x: rowIndex * columnWidth, y: columnIndex }}>
              {el}
            </div>
          );
        })}
      </div>
    );
  },
};
