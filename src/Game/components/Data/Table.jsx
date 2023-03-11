export default {
  render () {
    const { dataSource, columns, dataExtra, style } = this.props
    let x = 0
    return (
      <div style={style}>
        {columns.map((column, index) => {
          const { title, dataIndex, width = 1, height = 1, render } = column
          let y = 0
          y += height
          const rowEle = (
            <div style={{ x }}>
              <div style={{ width, height }}>{title}</div>
              {dataSource.map((rowData, rowIndex) => {
                const line = (
                  <div style={{ y, width, height }}>
                    {render
                      ? render.call(this, rowData, dataExtra, rowIndex, index)
                      : rowData[dataIndex]}
                  </div>
                )
                y += height
                return line
              })}
            </div>
          )
          x += width
          return rowEle
        })}
      </div>
    )
  },
}
