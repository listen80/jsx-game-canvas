import Select from "#/Base/Select";
import TitleText from "./TitleText";

export default {
  onCreate() {
    this.textProps = {
      position: { x: this.$config.screen.width / 2, y: 4 },
      text: this.$config.title,
      style: {
        font: "128px 楷体",
      },
      backgroundColor: "red",
    };

    this.style = { font: "24px 楷体" };

    this.position = {
      x: this.$config.screen.width / 2,
      y: 8,
    };

    this.options = [
      {
        text: "开始",
        event: "startGame",
      },
      {
        text: "继续",
        event: "loadGame",
      },
    ];

    // if (__DEV__) {
    //   this.$event.emit("loadGame");
    // }
  },

  onConfirm({ event }) {
    if (event) {
      this.$event.emit(event);
    }
  },

  render() {
    return (
      <div>
        <div {...this.textProps}></div>
        <Select
          align="center"
          style={this.style}
          size={{ height: 5, width: 3 }}
          position={this.position}
          options={this.options}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    );
  },
};
