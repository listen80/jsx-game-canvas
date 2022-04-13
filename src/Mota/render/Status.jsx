import { Component } from 'Engine'

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
                sy: 32 * 2,
                x: x * 32,
                y: y * 32,
                width: 32,
                height: 32,
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
            <div style={{ y: (index + 1) * 32, width: 32, height: 32 }}>
              <img
                src="icons.png"
                style={{
                  sy: index * 32,
                  width: 32,
                  height: 32,
                  swidth: 32,
                  sheight: 32,
                }}
              />
              <div style={{ x: 32, height: 32, width: 32 * 3 }}>{value}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
