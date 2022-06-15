import { Component } from 'Engine'

export default class Status extends Component {
  onCreate() {
    this.walls = []
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 13; y++) {
        if (x === 0 || y === 0 || y === 12) {
          this.walls.push(
            <img
              src="terrains"
              style={{
                sx: 0,
                sy: 1 * 2,
                x: x * 1,
                y: y * 1,
              }}
            ></img>,
          )
        }
      }
    }
  }

  render() {
    const { save, map } = this.$state
    const rowProperty = [
      this.$state.config.title,
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
      <div style={{ fontSize: 24, textAlign: 'center', textBaseLine: 'middle' }}>
        {this.walls}
        {rowProperty.map((value, index) => {
          return (
            <div style={{ x: 1, y: (index + 1) * 1, width: 1 }}>
              <img
                src="icons"
                style={{
                  sy: index * 1,
                  width: 1,
                  height: 1,
                  swidth: 1,
                  sheight: 1,
                }}
              />
              <div style={{ x: 1.5, y: 0, height: 1, width: 1 * 2.5, }}>{value}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
