export default {
  render () {
    const { width, height } = this.$config.screen

    const wrapProps = {
      size: { width, height },
      backgroundColor: 'rgba(0,0,0,0.4)',
    }

    if (this.props.show) {
      return <div {...wrapProps}>{this.$children}</div>
    }
  },
}
