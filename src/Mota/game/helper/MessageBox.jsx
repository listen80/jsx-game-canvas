import { Component } from "Engine";
import { calcLength } from "../../utils/string";

export default class MessageBox extends Component {
  messages = [];

  onMessage = (data) => {
    const { width: screenWidth } = this.$config.screen;
    data = data + "";
    const length = calcLength(data);
    const fontSize = 20;
    const width = ((fontSize / 2) * length + fontSize) / 32;

    this.messages.unshift({
      message: data,
      tick: 180,
      style: {
        backgroundColor: "rgba(0,0,0,.7)",
        x: (screenWidth - width) / 2,
        y: 2 + index * 1.2,
        height: 1,
        width: width,
        borderWidth: 2,
        borderColor: "white",
      },
      messageStyle: {
        textAlign: "center",
        fontSize,
        x: width / 2,
        height: 1,
      },
    });
  };

  onCreate() {
    this.$event.on("message", this.onMessage);
  }

  onDestroy() {
    this.$event.off("message", this.onMessage);
  }

  render() {
    this.messages = this.messages.filter((config) => {
      config.tick--;
      return config.tick > 0;
    });
    return this.messages.map((config, index) => {
      const { message, messageStyle, style } = config;
      style.globalAlpha = config.tick / 180;
      return (
        <div style={style}>
          <div style={messageStyle}>{message}</div>
        </div>
      );
    });
  }
}
