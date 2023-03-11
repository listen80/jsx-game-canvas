export default {
  onCreate () {
    this.attr = {
      style: {
        textAlign: 'right',
        textBaseline: 'top',
      },
      position: {
        x: this.$config.screen.width,
      },
      text: '-fps',
    }
  },
  getFps () {
    const timeStamp = performance.now()
    if (this.timeStamp) {
      this.attr.text = (1000 / (timeStamp - this.timeStamp)).toFixed() + 'fps'
    }
    this.timeStamp = timeStamp
  },
  render () {
    this.getFps()
    return (
      <div {...this.attr}></div>
    )
  },
}
