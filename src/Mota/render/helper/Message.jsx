import { Component } from "Engine";
import { screenWidth } from "../../config";
import { calcLength } from "../../utils/string";

export default class Message extends Component {
  messages = [];
  tempMessages = [];
  onCreate() {
    this.$on("setMessage", ($state, data, next) => {
      data = data + "";
      const length = calcLength(data);
      const fontSize = 20;
      const width = ((fontSize / 2) * length + fontSize) / 32;
      this.messages.unshift({
        message: data,
        tick: 180,
        width,
      });
      next && next();
    });
  }

  render() {
    this.messages = this.messages.filter((config) => {
      config.tick--;
      return config.tick > 0;
    });
    return this.messages.map((config, index) => {
      const { message, width } = config;

      return (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,.7)",
            globalAlpha: config.tick / 180,
            x: (screenWidth - width) / 2,
            y: 2 + index * 1.2,
            height: 1,
            width: width,
            borderWidth: 2,
            borderColor: "white",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: 20,
              x: width / 2,
              height: 1,
            }}
          >
            {message}
          </div>
        </div>
      );
    });
  }
}
