import { Component } from "Engine";
import Line from "../../components/Line";

export default class Status extends Component {
  styles = {
    wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle" },
  };

  onCreate() {
    this.walls = [];
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 13; y++) {
        if (x === 2 - 1 || y === 0 || y === 13 - 1) {
          this.walls.push(
            <div
              src="terrains"
              style={{
                sx: 0,
                sy: 2,
                x: x * 1,
                y: y * 1,
              }}
            ></div>
          );
        }
      }
    }
    const src = "icons";
    this.rowProperty = [
      {
        src,
        style: { sy: 11, height: 1, width: 1 },
        onMouseDown() {
          this.$state.showEnemyInfo = !this.$state.showEnemyInfo;
        },
      },
      {
        src,
        style: { sy: 12, height: 1, width: 1 },
        onMouseDown() {
          this.$state.showJumpFloor = !this.$state.showJumpFloor;
        },
      },
      {
        src,
        style: { sy: 13, height: 1, width: 1 },
        onMouseDown() {
          this.$state.showShopList = true;
        },
      },
      {
        src,
        style: { sy: 14, height: 1, width: 1 },
        onMouseDown() {
          this.$emit("saveGame");
          this.$emit("setMessage", "存储成功");
          this.$sound.play("se", "load.mp3");
        },
      },
      {
        src,
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
    const { styles, rowProperty } = this;

    return (
      <div style={styles.wrap}>
        {this.walls}
        <div style={styles.section}>
          <Line rows={rowProperty}></Line>
        </div>
      </div>
    );
  }
}
