import { KeyEventComponent } from 'Engine'

const size = 32

export default class ScrollText extends KeyEventComponent {
  styles = {
    text: {
      fontSize: 20,
      textAlign: 'left',
      textBaseline: 'top',
      x: 0,
      y: 0,
      width: size * 18,
      height: size * 13,
    },
    scroll: {
      x: size,
      y: size * 5,
    },
  };

  create () {
    const { text, bgm } = this.props.map
    this.text = text.split('\n')
    this.bgm = this.$sound.play('bgm', bgm)
  }

  destroy () {
    this.bgm.pause()
  }

  onKeyDown ({ code }) {
    if (code === 'Space') {
      this.onMouseDown()
    }
  }

  onMouseDown = () => {
    if (this.ready) {
      const { type, data } = this.props.map.event
      if (type === 'mapLoad') {
        this.props.onClose(data)
      } else if (type === 'title') {
        this.props.onTitle(data)
      }
    }
  };

  render () {
    const style = this.styles.scroll
    if (style.y > -size * (this.text.length - 2)) {
      const y = 1
      style.y -= y
    } else {
      this.ready = true
    }
    return (
      <div style={this.styles.text} onMouseDown={this.onMouseDown}>
        <div style={this.styles.scroll}>
          {this.text.map((text, index) => (
            <div style={{ y: index * size }}>{text}</div>
          ))}
        </div>
      </div>
    )
  }
}
