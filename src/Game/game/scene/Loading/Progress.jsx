export default {
  onCreate() {
    const { $loader, $config } = this

    const x = $config.screen.width / 2
    const y = 9

    const width = 7
    const height = 0.2

    this.progressBar = {
      // align: 'center',
      position: {
        x: ($config.screen.width - width) / 2,
        y: y - height / 2,
      },
      size: {
        width,
        height,
      },
      backgroundColor: '#fff',
    }

    this.progress = {
      size: {
        height,
      },
      backgroundColor: '#666',
    }
  },

  getProgressOn() {
    const { $loader } = this
    const rate = $loader.loaded / $loader.total
    const width = 7
    this.progress.size.width = width * (rate > 1 ? 1 : rate)
  },

  render() {
    this.getProgressOn()
    const { progressBar, progress } = this

    return (
      <div {...progressBar}>
        <div {...progress}></div>
      </div>
    )
  },
}
