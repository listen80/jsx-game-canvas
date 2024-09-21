import Select from "@/components/Base/Select";

export default {
  onCreate() {
    this.textProps = {
      position: { x: this.$config.screen.width / 2, y: 4 },

      text: this.$config.title,
      style: {
        font: "128px 楷体",
      },
      bgColor: "red",
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

    if (__DEV__) {
      this.$event.emit("loadGame");
    }
  },

  onConfirm({ event }) {
    if (event) {
      this.$event.emit(event);
    }
  },

  render() {
    return (
      <>
        <view {...this.textProps}></view>
        <Select
          style={this.style}
          position={this.position}
          size={{ height: 5, width: 3 }}
          align='center'
          options={this.options}
          onConfirm={this.onConfirm}
        ></Select>
      </>
    );
  },
};
