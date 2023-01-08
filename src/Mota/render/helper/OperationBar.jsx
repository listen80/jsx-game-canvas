import { Component } from "Engine";

export default class Status extends Component {
  styles = {
    wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle", y: 1 },
  };

  onCreate() {
    const { $state } = this;
    const { map } = $state;

    this.rowProperty = [
      { data: $state.config.title, style: { sy: 0 } },
      { data: map.name, style: { sy: 1 } },
      {
        data: "怪物",
        style: { sy: 11 },
        onMouseDown() {
          this.$state.showEnemyInfo = !this.$state.showEnemyInfo;
        },
      },
      {
        data: "楼层",
        style: { sy: 12 },
        onMouseDown() {
          this.$state.showJumpFloor = !this.$state.showJumpFloor;
        },
      },
      {
        data: "商店",
        style: { sy: 13 },
        onMouseDown() {
          this.$state.showShopList = true;
        },
      },
      {
        data: "读档",
        style: { sy: 15 },
        onMouseDown() {
          this.$emit("loadGame");
          // this.$emit("setMessage", "读取成功");
          this.$sound.play("se", "load.mp3");
        },
      },
      {
        data: "存档",
        style: { sy: 14 },
        onMouseDown() {
          this.$emit("saveGame");
          this.$emit("setMessage", "存储成功");
          this.$sound.play("se", "load.mp3");
        },
      },
      {
        data: "设置",
        style: { sy: 16 },
        onMouseDown() {
          this.$emit("setMessage", "设置");
        },
      },
      {
        data: "统计",
        style: { sy: 17 },
        onMouseDown() {
          this.$emit("setMessage", "统计");
        },
      },
    ];
  }

  render() {
    const { styles, rowProperty } = this;

    return (
      <div style={styles.wrap}>
        {rowProperty.map(({ style, data, onMouseDown }, index) => {
          return (
            <div style={{ y: index * 1.16 + 0.3, width: 3, height: 1 }} onMouseDown={onMouseDown}>
              <div src="icons" style={style} />
              <div style={{ x: 1.5, y: 0, height: 1, width: 2.5 }}>{data}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
