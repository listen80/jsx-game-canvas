
import { Component } from 'Engine'

export default class Status extends Component {
  create () {
    this.walls = []
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 13; y++) {
        if (x === 4 || y === 0 || y === 12) {
          this.walls.push(<img src="terrains.png" style={{ sx: 0, sy: 32 * 2, x: x * 32, y: y * 32, width: 32, height: 32 }}></img>)
        }
      }
    }
  }

  render () {
    const map = [
      '魔塔',
      this.props.map.name,
      this.props.saveData.hero.lv,
      this.props.saveData.hero.hp,
      this.props.saveData.hero.atk,
      this.props.saveData.hero.def,
      this.props.saveData.hero.exp,
      this.props.saveData.money,
      this.props.saveData.items.yellowKey,
      this.props.saveData.items.blueKey,
      this.props.saveData.items.redKey,
    ]
    const size = 32
    const offset = (32 - size) / 2
    return (
      <div style={{ fontSize: 24 }}>
        {this.walls}
        {map.map((value, index) => {
          return <div style={{ y: (index + 1) * 32, wdith: 32, height: 32 }}>
            <img src="icons.png" style={{ x: offset, y: offset, sx: 0, sy: index * 32, wdith: size, height: size, swidth: 32, sheight: 32 }} />
            <div style={{ x: 32, height: 32, width: 32 * 3 }}>{value}</div>
          </div>
        })}
      </div>
    )
  }
}
