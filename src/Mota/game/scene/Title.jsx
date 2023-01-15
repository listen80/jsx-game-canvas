import Select from "../../components/Select";
import TitleText from "./components/TitleText";

export default {
  onCreate() {

    this.style = { font: "24px 楷体" }

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
        disabled: !localStorage.getItem("game"),
      },
    ]

    if (__DEV__) {
      this.$event.emit('loadGame')
    }
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
          style={this.style}
          position={this.position}
          options={this.options}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    );
  },
};
