import { Component } from "Engine";
import { operationWidth, screenHeight } from "../../config";

export default class Status extends Component {
  styles = {
    wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle" },
    section: { y: 1 },
  };

  onCreate() {
    this.walls = [];
    for (let x = 0; x < operationWidth; x++) {
      for (let y = 0; y < screenHeight; y++) {
        if (x === operationWidth - 1 || y === 0 || y === screenHeight - 1) {
          this.walls.push(<div src="terrains" style={{ sy: 2, x, y }}></div>);
        }
      }
    }
    const src = "icons";
    this.rowProperty = [
      {
        src,
        style: { sy: 11, height: 1, width: 1 },
      },
      {
        src,
        style: { sy: 12, height: 1, width: 1 },
      },
      {
        src,
        style: { sy: 13, height: 1, width: 1 },
      },
      {
        src,
        style: { sy: 14, height: 1, width: 1 },
      },
      {
        src,
        style: { sy: 15, height: 1, width: 1 },
      },
    ];
  }

  render() {
    const { styles, $state } = this;
    const { save, map } = $state;
    const rowProperty = [
      { data: $state.config.title, sy: 0 },
      { data: map.name, sy: 1 },
      { data: save.hero.lv, sy: 2 },
      { data: save.hero.hp, sy: 3 },
      { data: save.hero.atk, sy: 4 },
      { data: save.hero.def, sy: 5 },
      { data: save.hero.exp, sy: 6 },
      { data: save.money, sy: 7 },
      { data: save.items.yellowKey, sy: 8 },
      { data: save.items.blueKey, sy: 9 },
      { data: save.items.redKey, sy: 10 },
    ];

    return (
      <div style={styles.wrap}>
        {this.walls}
        <div style={styles.section}>
          {rowProperty.map((value, index) => {
            return (
              <div style={{ y: index }}>
                <div
                  src="icons"
                  style={{
                    sy: value.sy,
                    width: 1,
                    height: 1,
                    swidth: 1,
                    sheight: 1,
                  }}
                />
                <div style={{ x: 1.5, y: 0, height: 1, width: 2.5 }}>
                  {value.data}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
