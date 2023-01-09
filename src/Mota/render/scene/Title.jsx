import { Component } from "Engine";
import Select from "Mota/components/Select";
import TitleText from "./components/TitleText";
import { screenWidth } from "../../config";

const selectWidth = 3;

export default class Title extends Component {
  styles = {
    titleSelect: {
      x: (screenWidth - selectWidth) / 2,
      y: 8,
      width: selectWidth,
      fontSize: 24,
      textAlign: "center",
      textBaseline: "middle",
    },
  };

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
    if (__DEV__) {
      this.$event.emit("loadGame")
    }
  }

  onConfirm = (option) => {
    const { event } = option;
    if (event) {
      this.$emit(event);
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
