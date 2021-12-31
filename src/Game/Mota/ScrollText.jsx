import { KeyEventComponent } from 'Engine'

export default class ScrollText extends KeyEventComponent {
  styles = {
    text: {
      fontSize: 20,
      textAlign: 'left',
      textBaseline: 'top',
      x: 32,
      y: 32 * 5,
      width: 32 * 18,
      height: 32 * 13,
    },
  };

  create () {
    const { text, bgm } = this.props.map
    this.text = text.split('\n')
    window.$audio.play('bgm', bgm)
  }

  destroy () {
    const bgm = this.props.map.bgm
    window.$audio.pause('bgm', bgm)
  }

  onKeyDown ({ code }) {
    if (code === 'Space') {
      if (this.ready) {
        const { type, data } = this.props.map.event
        if (type === 'mapLoad') {
          this.props.onClose(data)
        } else if (type === 'title') {
          this.props.onTitle(data)
        }
      }
    }
  }

  render () {
    const size = 32
    const style = this.styles.text
    if (style.y > -32 * (this.text.length - 2)) {
      const y = 1
      style.y -= y
    } else {
      this.ready = true
    }
    return (
      <div style={this.styles.text} onClick={this.onKeyDown}>
        {this.text.map((text, index) => {
          const optionStyle = {
            y: index * size,
          }
          return <div style={optionStyle}>{text}</div>
        })}
      </div>
    )
  }
}
