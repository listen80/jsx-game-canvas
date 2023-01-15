

export default class Line extends Component {
  render () {
    const { rows } = this.props
    let y = 0
    return rows.map((column, index) => {
      const { style, ...others } = column
      const rowEle = <div style={{ ...style, y }} {...others}></div>
      y += style?.height ?? 1
      return rowEle
    })
  }
}
