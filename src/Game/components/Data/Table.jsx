export default {
  render() {
    const { dataSource, columns, dataExtra } = this.props;
    return (
      <div {...this.props}>
        {dataSource.map((rowData, rowIndex) => {
          let x = 0;
          return columns.map((column, columnIndex) => {
            const { title, dataIndex, width = 1, height = 1, render } = column;
            let y = 0;
            return (
              <div
                position={{ x: x, y: rowIndex }}
                // size={{ width, height }}
                right={(x = x + width)}
                bottom={(y = y + height)}
              >
                {render ? (
                  render.call(this, {
                    rowData,
                    rowIndex,
                    columnIndex,
                    column,
                    // data: rowData[dataIndex],
                    dataExtra,
                  })
                ) : (
                  <div text={rowData[dataIndex]}></div>
                )}
              </div>
            );
          });
        })}
      </div>
    );
  },
};
