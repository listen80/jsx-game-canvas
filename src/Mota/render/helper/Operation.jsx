import { Component } from "Engine";
import Line from "../../components/Line";

export default class Status extends Component {
  styles = {
    wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle" },
    section: { y: 1 },
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
                sy: 1 * 2,
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
          console.log(...arguments);
        },
      },
      {
        src,
        style: { sy: 12, height: 1, width: 1 },
        onMouseDown() {
          console.log(...arguments);
        },
      },
      {
        src,
        style: { sy: 13, height: 1, width: 1 },
        onMouseDown() {
          console.log(...arguments);
        },
      },
      {
        src,
        style: { sy: 14, height: 1, width: 1 },
        onMouseDown() {
          console.log(...arguments);
        },
      },
      {
        src,
        style: { sy: 15, height: 1, width: 1 },
        onMouseDown() {
          console.log(...arguments);
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
