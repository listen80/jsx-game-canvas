import { Component } from 'Engine'
import Table from './Table'

const size = 32

export default class Status extends Component {
  create () {
    this.walls = []
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 13; y++) {
        if (x === 4 || y === 0 || y === 12) {
          this.walls.push(
            <img
              src="terrains.png"
              style={{
                sx: 0,
                sy: size * 2,
                x: x * size,
                y: y * size,
              }}
            ></img>,
          )
        }
      }
    }
  }

  render () {
    const { map } = this.props
    const { save } = this.$data
    const rowProperty = [
      this.$data.game.title,
      map.name,
      save.hero.lv,
      save.hero.hp,
      save.hero.atk,
      save.hero.def,
      save.hero.exp,
      save.money,
      save.items.yellowKey,
      save.items.blueKey,
      save.items.redKey,
    ]
    return (
      <div style={{ fontSize: 24 }}>
        {this.walls}
        {rowProperty.map((value, index) => {
          return (
            <div style={{ y: (index + 1) * size, width: size, height: size }}>
              <img
                src="icons.png"
                style={{
                  sy: index * size,
                  width: size,
                  height: size,
                  swidth: size,
                  sheight: size,
                }}
              />
              <div style={{ x: size, height: size, width: size * 3 }}>{value}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
