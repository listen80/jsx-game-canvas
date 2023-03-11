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
    return <div size={{ width: 3, height: 3 }} style={{ fillStyle: this.lineGradient }} backgroundColor={this.lineGradient} lineGradient2={this.lineGradient}></div>
  },
}
