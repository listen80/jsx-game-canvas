export default {
  onCreate () {
    const lineGradient = this.$render.context.createLinearGradient(0, 0, 0, 32)
    lineGradient.addColorStop(0, 'rgba(0,0,0,1)')
    lineGradient.addColorStop(0.1, 'rgba(244,244,31,.1)')
    lineGradient.addColorStop(0.9, 'rgba(244,244,31,.1)')
    lineGradient.addColorStop(1, 'rgba(0,0,0,1)')
    this.lineGradient = lineGradient
  },
  render () {
    return <view size={{ width: 3, height: 3 }} style={{ fillStyle: this.lineGradient }} bgColor={this.lineGradient} lineGradient2={this.lineGradient}></view>
  },
}
