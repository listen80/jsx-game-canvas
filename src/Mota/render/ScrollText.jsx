import { Component } from 'Engine'


export default class ScrollText extends Component {
  styles = {
    text: {
      fontSize: 20,
      textAlign: 'left',
      textBaseline: 'top',
      width: 18,
      height: 13,
    },
    scroll: {
      x: 1,
      y: 5,
    },
  };

  create () {
    const { text, bgm } = this.$state.map
    this.text = text.split('\n')
    this.mapBgm = this.$sound.play('bgm', bgm)
  }

  destroy () {
    this.mapBgm.pause()
  }

  onKeyDown ({ code }) {
    if (code === 'Space') {
      this.onMouseDown()
    }
  }

  onMouseDown = () => {
    if (this.ready) {
      // const { type, data } = this.props.map.event
      this.$event('loadMap', this.$state.map.event.data.mapId)
      // if (type === 'mapLoad') {
      //   this.props.onClose(data)
      // } else if (type === 'title') {
      //   this.props.onTitle(data)
      // }
    }
  };

  render () {
    const style = this.styles.scroll
    if (style.y > -1 * (this.text.length - 2)) {
      style.y -= 1 / 16
    } else {
      this.ready = true
    }
    return (
      <div style={this.styles.text} onMouseDown={this.onMouseDown}>
        <div style={this.styles.scroll}>
          {this.text.map((text, index) => (
            <div style={{ y: index }}>{text}</div>
          ))}
        </div>
      </div>
    )
  }
}
