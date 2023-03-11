export default {
  onCreate () {
    this.scrollTop = 0
    this.height = this.props.height || 0
    this.width = this.props.width || 10
    this.contentHeight = this.props.contentHeight || 0
  },

  onWheel (event) {
    const { deltaY } = event
    const ratio = 4
    this.scrollTop +=
      ratio * (deltaY > 0 ? Math.ceil(deltaY / 100) : Math.floor(deltaY / 100))
    if (this.scrollTop > this.contentHeight - this.height) {
      this.scrollTop = this.contentHeight - this.height
    } else if (this.scrollTop < 0) {
      this.scrollTop = 0
    }
  },

  render () {
    return (
      <div
        style={{
          height: this.height,
          width: this.width,
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
        onWheel={this.onWheel}
      >
        <div style={{ y: -this.scrollTop }}>{this.$children}</div>
      </div>
    )
  },
}
