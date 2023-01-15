export default {
  onCreate() {
    this.styles = {
      wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle", y: 1 },
    }
    const { $state, $config } = this;
    const { map } = $state;

    this.rowProperty = [
      { data: $config.title, style: { sy: 0 } },
      { data: map.name, style: { sy: 1 } },
      {
        data: "怪物",
        style: { sy: 11 },
        onClick() {
          this.$state.showEnemyInfo = !this.$state.showEnemyInfo;
        },
      },
      {
        data: "楼层",
        style: { sy: 12 },
        onClick() {
          this.$state.showJumpFloor = !this.$state.showJumpFloor;
        },
      },
      {
        data: "商店",
        style: { sy: 13 },
        onClick() {
          this.$state.showShopList = true;
        },
      },
      {
        data: "读档",
        style: { sy: 15 },
        onClick() {
          this.$event.emit("loadGame");
          // this.$event.emit("message", "读取成功");
          this.$sound.play("se", "load.mp3");
        },
      },
      {
        data: "存档",
        style: { sy: 14 },
        onClick() {
          this.$event.emit("saveGame");
          this.$event.emit("message", "存储成功");
          this.$sound.play("se", "load.mp3");
        },
      },
      {
        data: "设置",
        style: { sy: 16 },
        onClick() {
          this.$state.showConfig = !this.$state.showConfig
        },
      },
      {
        data: "统计",
        style: { sy: 17 },
        onClick() {
          this.$event.emit("gotoTitle", "设置");
          // this.$event.emit("message", "统计");
        },
      },
    ];
  },

  render() {
    const { styles, rowProperty } = this;

    return (
      <div style={styles.wrap}>
        {rowProperty.map(({ style, data, onClick }, index) => {
          return (
            <div position={{ y: index * 1.16 + 0.3, width: 3, height: 1 }} onClick={onClick}>
              <div image="icons" sposition={style} />
              <div style={{ x: 1.5, y: 0, height: 1, width: 2.5 }}>{data}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
