export default {
  render() {
    const { dataSource, columns, dataExtra } = this.props;
    let x = 0;
    return (
      <div {...this.props}>
        {dataSource.map((rowData, rowIndex) => {
          return columns.map((column, columnIndex) => {
            const { title, dataIndex, width = 1, height = 1, render } = column;
            return (
              <div
                position={{ x: columnIndex + 1, y: rowIndex }}
                // size={{ width, height }}
              >
                {render ? (
                  render.call(
                    this,
                    {
                      rowData,
                      rowIndex,
                      columnIndex,
                      column,
                      // data: rowData[dataIndex],
                      dataExtra,
                    },
                  )
                ) : (
                  <div text={rowData[dataIndex]}></div>
                )}
              </div>
            );
          });
        })}
      </div>
    );
    return (
      <div {...this.props}>
        {columns.map((column, columnIndex) => {
          const { title, dataIndex, width = 1, height = 1, render } = column;
          let y = 0;
          return (
            <div>
              <div position={{ x, y }} size={{ width, height }}>
                {title}
              </div>
              {dataSource.map((rowData, rowIndex) => {
                const line = (
                  <div size={{ y, width, height }}>
                    {((y += height), render)
                      ? render.call(
                          this,
                          { rowData, rowIndex, columnIndex },
                          dataExtra
                        )
                      : rowData[dataIndex]}
                  </div>
                );
                return line;
              })}
              {((x += width), null)}
            </div>
          );
        })}
      </div>
    );
  },
};
