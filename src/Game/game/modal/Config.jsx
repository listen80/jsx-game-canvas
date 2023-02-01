
import Select from "#/Base/Select";

export default {
  onCreate() {
    const screenWidth = this.$config.screen.width;

    const width = 7,
      height = 8;

    const x = (screenWidth - width) / 2;
    const y = 2;

    this.styles = {
      shop: {
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
      select: { x: 1, y: 7 / 2, width: 5, fontSize: 16 },
    };
    this.options = [
      {
        text: "fontFamily",
      },
    ];
    this.options.push({
      text: "离开",
    });
  },

  onConfirm(option, index) {
    this.$state.showConfig = false;
  },

  renderText() {
    return this.textArr.map((text, index) => (
      <div style={{ x: width / 2, y: index / 2 }}>{text}</div>
    ));
  },

  render() {
    const { styles } = this;
    return (
      <div style={styles.shop}>
        <Select
          style={styles.select}
          options={this.options}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  }
}
