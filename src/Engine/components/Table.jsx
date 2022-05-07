import Component from '../core/Component'

export default class Table extends Component {
  render () {
    const { dataSource, columns, data } = this.props
    let x = 0
    return columns.map((column, index) => {
      const { title, dataIndex, width = 1, render } = column
      const rowEle = (
        <div style={{ x: 0, y: 0, textAlign: 'start' }}>
          <div style={{ x: x, width: width * 1, height: 1 }}>{title}</div>
          {dataSource.map((rowData, rowIndex) => {
            return (
              <div
                style={{
                  x: x,
                  y: (rowIndex + 1) * 1,
                  width: width * 1,
                  height: 1,
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
      x += width * 1
      return rowEle
    })
  }
}
