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
    continue: {
      x: 9,
      y: 5,
      textAlign: 'center',
      fontSize: 50,
    },
  };

  onCreate () {
    const { text, bgm } = this.$state.map
    this.textArr = text.split('\n')
    this.mapBgm = this.$sound.play('bgm', bgm)
  }

  onDestroy () {
    this.mapBgm.pause()
  }

  onKeyDown ({ code }) {
    if (code === 'Space') {
      this.onMouseDown()
    }
  }

  onMouseDown = () => {
    if (this.ready) {
      if (this.$state.map.event) {
        this.$state.map.event.forEach((v) => {
          this.$hook(v)
        })
      }
      // if (type === 'loadMap') {
      //   this.props.onClose(data)
      // } else if (type === 'title') {
      //   this.props.onTitle(data)
      // }
    }
  };

  render () {
    const style = this.styles.scroll
    if (style.y > -1 * this.text.length) {
      style.y -= 1 / 16
    } else {
      this.ready = true
    }
    return (
      <div style={this.styles.text} onMouseDown={this.onMouseDown}>
        {
          this.ready
            ? <div style={this.styles.continue}>点击继续</div>
            : <div style={this.styles.scroll}>
            {this.textArr.map((text, index) => (
              <div style={{ y: index }}>{text}</div>
            ))}
          </div>
        }
      </div>
    )
  }
}
