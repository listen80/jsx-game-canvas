import { Component } from '../core/Component'

export default class Scroll extends Component {
  create () {
    this.scrollTop = 0
    this.height = this.props.heigth || 0
    this.width = this.props.width || 100
    this.contentHeight = this.props.contentHeight || 0
  }

  onWheel = (event) => {
    const { deltaY } = event
    this.scrollTop +=
      4 * (deltaY > 0 ? Math.ceil(deltaY / 100) : Math.floor(deltaY / 100))
    if (this.scrollTop > this.contentHeight - this.height) {
      this.scrollTop = this.contentHeight - this.height
    } else if (this.scrollTop < 0) {
      this.scrollTop = 0
    }
    console.log(this.scrollTop)
  };

  render () {
    return (
      <div
        style={{
          height: this.height,
          width: this.width,

          overflow: 'hidden',
          backgroundColor: 'white',
        }}
        onWheel={this.onWheel}
      >
        <div style={{ y: -this.scrollTop }}>{this.$children}</div>
      </div>
    )
  }
}
