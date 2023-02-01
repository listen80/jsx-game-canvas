import Select from "../../components/Base/Select";

export default {
  onCreate() {
    const width = 7,
      height = 8;

    const x = (screenWidth - width) / 2;
    const y = 2;

    this.styles = {
      jumpFloor: {
        x,
        y,
        width,
        height,
        borderWidth: 4,
        borderColor: "white",
        backgroundColor: "black",
        textAlign: "center",
      },
      title: { x: width / 2, y: 1, fontSize: 24 },
      text: { x: 0, y: 2, fontSize: 12 },
      select: { x: 1, y: 1.75, width: 5, fontSize: 16 },
    };

    const floors = this.$state.save.floors;
    this.options = floors.map((text) => {
      return { text, mapId: text.split(".")[0] };
    });
    this.options.push({
      text: "离开",
    });
  },

  onConfirm(option, index) {
    const { mapId } = option;

    this.$state.showJumpFloor = false;
    if (mapId) {
      this.$event.emit("loadMap", {
        mapId,
        position: {
          x: 6,
          y: 6,
        },
      });
    }
  },

  render() {
    const { styles } = this;
    return (
      <div style={styles.jumpFloor}>
        <div style={styles.title}>楼层选择</div>
        <Select
          style={styles.select}
          options={this.options}
          optionSize={{ height: 0.8 }}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  },
};
