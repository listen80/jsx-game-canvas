import { Component } from '../core/Component'

export default class Table extends Component {
  render () {
    const { dataSource, columns, size = 32, data } = this.props
    let x = 0
    return columns.map((column, index) => {
      const { title, dataIndex, width = 1, render } = column
      const rowEle = (
        <div style={{ x: 0, y: 0, textAlign: 'start' }}>
          <div style={{ x: x, width: width * size, height: size }}>{title}</div>
          {dataSource.map((rowData, rowIndex) => {
            return (
              <div
                style={{
                  x: x,
                  y: (rowIndex + 1) * size,
                  width: width * size,
                  height: size,
                }}
              >
                {render
                  ? render.call(this, rowData, data, rowIndex, index)
                  : rowData[dataIndex]}
              </div>
            )
          })}
        </div>
      )
      x += width * size
      return rowEle
    })
  }
}
