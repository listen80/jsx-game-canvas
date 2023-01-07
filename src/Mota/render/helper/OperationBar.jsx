import { Component } from "Engine";
import { statusbarWidth, screenHeight } from "../../config";

import Line from "../../components/Line";

export default class Status extends Component {
  styles = {
    wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle" },
    section: { y: 1 },
  };

  onCreate() {
    this.walls = [];
    for (let x = 0; x < statusbarWidth; x++) {
      for (let y = 0; y < screenHeight; y++) {
        if (x === statusbarWidth - 1 || y === 0 || y === screenHeight - 1) {
          this.walls.push(<div src="terrains" style={{ sy: 2, x, y }}></div>);
        }
      }
    }

    const src = "icons";
    this.rowProperty = [
      {
        src,
        data: "信息",
        style: { sy: 11, height: 1, width: 1 },
        onMouseDown() {
          this.$state.showEnemyInfo = !this.$state.showEnemyInfo;
        },
      },
      {
        src,
        data: "楼层",
        style: { sy: 12, height: 1, width: 1 },
        onMouseDown() {
          this.$state.showJumpFloor = !this.$state.showJumpFloor;
        },
      },
      {
        src,
        data: "商店",
        style: { sy: 13, height: 1, width: 1 },
        onMouseDown() {
          this.$state.showShopList = true;
        },
      },
      {
        src,
        data: "存档",
        style: { sy: 14, height: 1, width: 1 },
        onMouseDown() {
          this.$emit("saveGame");
          this.$emit("setMessage", "存储成功");
          this.$sound.play("se", "load.mp3");
        },
      },
      {
        src,
        data: "读档",
        style: { sy: 15, height: 1, width: 1 },
        onMouseDown() {
          this.$emit("loadGame");
          this.$emit("setMessage", "读取成功");
          this.$sound.play("se", "load.mp3");
        },
      },
    ];
  }

  render() {
    const { styles, $state, rowProperty } = this;
    const { save, map } = $state;

    return (
      <div style={styles.wrap}>
        {this.walls}
        <div style={styles.section}>
          {rowProperty.map((value, index) => {
            return (
              <div style={{ y: index }} onMouseDown={value.onMouseDown}>
                <div src="icons" style={value.style} />
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
