import Component from '../core/Component'

export default class Table extends Component {
  render() {
    const { dataSource, columns, data } = this.props
    let x = 0;
    return columns.map((column, index) => {
      const { title, dataIndex, width = 1, height = 1, render } = column
      let y = height
      const rowEle = <div style={{ x: 0, y: 0, textAlign: 'start' }}>
        <div style={{ x, width, height }}>{title}</div>
        {dataSource.map((rowData, rowIndex) => {
          y += height
          const style = {
            x,
            y,
            width: width,
            height: height,
          }
          return (
            <div style={style} >
              {render ? render.call(this, rowData, data, rowIndex, index) : rowData[dataIndex]}
            </div>
          )
        })}
      </div>
      x += width
      return rowEle
    })
  }
}
