import Select from '#/Base/Select'
import TitleText from './components/TitleText'

export default {
  onCreate () {
    this.style = { font: '24px 楷体' }

    this.position = {
      x: this.$config.screen.width / 2,
      y: 8,
    }

    this.select = {}

    this.options = [
      {
        text: '开始',
        event: 'startGame',
      },
      {
        text: '继续',
        event: 'loadGame',
      },
    ]

    // if (__DEV__) {
    //   this.$event.emit("loadGame");
    // }
  },

  onConfirm ({ event }) {
    if (event) {
      this.$event.emit(event)
    }
  },

  render () {
    return (
      <div>
        <TitleText />
        <Select
          style={this.style}
          position={this.position}
          options={this.options}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    )
  },
}
