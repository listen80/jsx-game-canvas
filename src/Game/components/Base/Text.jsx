export default {
  render () {
    const { value, size } = this.props
    const { width = 1, height = 1 } = size || {}
    return <div {...this.props}>
      <div position={{ x: width / 2, y: height / 2 }} text={value}></div>
    </div>
  },
}
