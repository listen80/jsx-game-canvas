import Select from "../../components/Select";
import TitleText from "./components/TitleText";

export default {

  onCreate() {
    const { width } = this.$config.screen;
    this.position = {
      x: width / 2,
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
        disabled: !localStorage.getItem("game"),
      },
    ]

    // if (__DEV__) {
    //   this.$event.emit("loadGame")
    // }
  },

  onConfirm(option) {
    const { event } = option;
    if (event) {
      this.$event.emit(event);
    }
  },

  render() {
    return (
      <div>
        <TitleText />
        <Select
          style={{ font: "24px 楷体" }}
          position={this.position}
          options={this.options}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    );
  },
};
