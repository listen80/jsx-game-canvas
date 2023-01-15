export default {
  render() {
    const { position, size } = this.props;

    const { x = 0, y = 0 } = position || {}
    const { width = 0, height = 0 } = size || {}
    return <div {...this.props} position={{ x: x - width / 2, y: y - height / 2, }} >{this.$children}</div>
  }
}