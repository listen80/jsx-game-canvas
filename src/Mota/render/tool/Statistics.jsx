import { Component } from "Engine";
import Select from "Mota/components/Select";
import { screenWidth } from "../../config";
import { fontFamily } from "Engine/const/fonts";

const width = 7,
  height = 8;

const x = (screenWidth - width) / 2;
const y = 2;

export default class Statistics extends Component {
  styles = {
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

  onCreate() {
    this.options = [
      {
        text: fontFamily,
      },
    ];
    this.options.push({
      text: "离开",
    });
  }

  onConfirm = (option, index) => {
    this.$state.showConfig = false;
  };

  render() {
    const { styles } = this;
    
  }
}
