import { KeyEventComponent } from 'Engine'

export default class Select extends KeyEventComponent {
  styles = {
    select: {
      fontSize: 24,
      textAlign: 'center',
      width: 320,
    },
  }

  create () {
    this.activeIndex = this.props.activeIndex || 0
    const { style } = this.props
    if (style) {
      Object.assign(this.styles.select, style)
    }
  }

  onKeyDown ({ code }) {
    if (code === 'ArrowDown') {
      this.activeIndex++
      if (this.activeIndex === this.props.options.length) {
        this.activeIndex = 0
      }
      this.props.onChange && this.props.onChange(this.activeIndex, this.props.options[this.activeIndex])
    } else if (code === 'ArrowUp') {
      this.activeIndex--
      if (this.activeIndex === -1) {
        this.activeIndex += this.props.options.length
      }
      this.props.onChange && this.props.onChange(this.activeIndex, this.props.options[this.activeIndex])
    } else if (code === 'Space') {
      this.props.onConfirm && this.props.onConfirm(this.activeIndex, this.props.options[this.activeIndex])
    } else if (code === 'Escape') {
      this.props.onClose && this.props.onClose()
    }
  }

  onClick (index) {
    this.activeIndex = index
    this.props.onConfirm && this.props.onConfirm(this.activeIndex, this.props.options[this.activeIndex])
  }

  render () {
    const size = 32
    const borderWidth = 2
    const select = this.styles.select
    const { width } = select

    return (
      <div style={this.styles.select}>
        {
          this.props.options && this.props.options.length
            ? this.props.options.map((item, index) => {
              const { text } = item
              const optionStyle = {
                y: index * size,
                height: size,
                width: width,
                borderWidth: this.activeIndex === index ? borderWidth : 0,
                borderColor: '#ccc',
              }
              return (
                <div style={optionStyle} onClick={() => this.onClick(index)} onMouseLeave={(e) => { this.activeIndex = -1 }} onMouseEnter={(e) => { this.activeIndex = index }}>
                  {text}
                </div>
              )
            })
            : '空空如也'}
      </div>
    )
  }
}
