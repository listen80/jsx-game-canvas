
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
    const { saveData, map } = this.props
    const rowProperty = [
      this.$data.game.title,
      map.name,
      saveData.hero.lv,
      saveData.hero.hp,
      saveData.hero.atk,
      saveData.hero.def,
      saveData.hero.exp,
      saveData.money,
      saveData.items.yellowKey,
      saveData.items.blueKey,
      saveData.items.redKey,
    ]
    return (
      <div style={{ fontSize: 24 }}>
        {this.walls}
        {rowProperty.map((value, index) => {
          return <div style={{ y: (index + 1) * 32, width: 32, height: 32 }}>
            <img src="icons.png" style={{ sy: index * 32, width: 32, height: 32, swidth: 32, sheight: 32 }} />
            <div style={{ x: 32, height: 32, width: 32 * 3 }}>{value}</div>
          </div>
        })}
      </div>
    )
  }
}
