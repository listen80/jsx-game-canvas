export default {
  render () {
    let x = 0
    return this.children.map((child) => {
      const { width = 1 } = child.props?.size || {}
      const rowEle = <view position={{ x }}>{child}</view>
      x += width
      return rowEle
    })
  },
}
