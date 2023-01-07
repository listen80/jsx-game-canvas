import { Component } from "Engine";
import Select from "../../components/Select";

export default class Title extends Component {
  styles = {
    titleText: {
      y: 2,
      width: 18,
      height: 4,
      textAlign: "center",
      fontSize: 128,
    },
    titleSelect: {
      x: 7.5,
      y: 8,
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

  onCreate () {
    if (__DEV__) {
      this.$emit("loadGame")
    }
  }

  render() {
    return (
      <div>
        <div style={this.styles.titleText}>魔塔</div>
        <Select
          style={this.styles.titleSelect}
          optionSize={{ width: 3 }}
          options={this.options}
        ></Select>
      </div>
    );
  }
}
