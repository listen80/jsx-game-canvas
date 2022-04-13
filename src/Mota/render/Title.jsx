import { Component } from 'Engine'
import Select from './Select'
import { loadGame } from '../../Engine/utils/sl'

const size = 32

const styles = {
  title: {
    width: size * (13 + 5),
    height: size * 13,
  },
  gameName: {
    y: size * 2,
    width: size * (13 + 5),
    height: size * 4,
    font: 'bold 128px 黑体',
  },
  select: {
    x: size * 8,
    y: size * 8,
    width: size * 2,
  },
}

export default class Title extends Component {
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
  };

  render () {
    return (
      <div style={styles.title}>
        <div style={styles.gameName}>{this.$data.game.title}</div>
        <Select
          activeIndex={this.activeIndex}
          options={this.options}
          style={styles.select}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    )
  }
}
