import { Component } from 'Engine'
import Select from './Select'
import { loadGame } from '../../Engine/utils/sl'

export default class Title extends Component {
  styles = {
    title: {
      width: 32 * (13 + 5),
      height: 32 * 13,
    },
    gameName: {
      y: 40,
      width: 32 * (13 + 5),
      height: 128,
      font: 'bold 128px 黑体',
    },
    select: {
      x: 16 * 16,
      y: 32 * 8,
      width: 64,
    },
  }

  create () {
    this.activeIndex = loadGame() ? 1 : 0
    this.options = [
      {
        text: '开始',
      },
      {
        text: '继续',
      },
    ]
  }

  onConfirm = (isLoad) => {
    this.props.onLoadMap(isLoad ? loadGame() : null)
  }

  render () {
    return (
      <div style={this.styles.title}>
        <div style={this.styles.gameName}>{this.$data.game.title}</div>
        <Select activeIndex={this.activeIndex} options={this.options} style={this.styles.select} onConfirm={this.onConfirm}></Select>
      </div>
    )
  }
}
