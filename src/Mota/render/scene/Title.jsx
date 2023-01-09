import { Component } from "Engine";
import Select from "Mota/components/Select";
import TitleText from "./components/TitleText";

export default class Title extends Component {
  styles = {};

  options = [
    {
      text: "开始",
      event: "startGame",
    },
    {
      text: "继续",
      event: "loadGame",
      disabled: !localStorage.getItem("game"),
    },
  ];

  onCreate() {
    const { width } = this.$config.screen;
    const selectWidth = 3;
    this.styles.titleSelect = {
      x: (width - selectWidth) / 2,
      y: 8,
      width: selectWidth,
      fontSize: 24,
      textAlign: "center",
      textBaseline: "middle",
    };
    // if (__DEV__) {
    //   this.$event.emit("loadGame")
    // }
  }

  onConfirm = (option) => {
    const { event } = option;
    if (event) {
      this.$event.emit(event);
    }
  };

  render() {
    return (
      <div>
        <TitleText />
        <Select
          style={this.styles.titleSelect}
          options={this.options}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    );
  }
}
