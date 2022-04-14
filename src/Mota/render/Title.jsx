import { Component, Select, Animate } from 'Engine'
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
    fontSize: 128,
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
        <Animate
          data={{
            src: 'stand.png',
            maxTick: 4,
            sy: 4,
            x: 208,
            y: 100,
            width: 632 / 4,
            height: 768 / 8,
          }}
        ></Animate>
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
