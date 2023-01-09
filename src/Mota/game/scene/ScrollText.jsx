import { Component } from "Engine";
import { screenWidth } from "../../config";

const continueMessageFontSize = 64;
const continueMessageWidth = (64 / 32) * 4;
const continueMessageHeight = 64 / 32;

export default class ScrollText extends Component {
  styles = {
    wrap: {
      fontSize: 24,
      textAlign: "left",
      textBaseline: "top",
      width: screenWidth,
    },
    scrollText: {
      x: 1,
      y: 13,
    },
    continueMessage: {
      x: (screenWidth - continueMessageWidth) / 2,
      y: 5,
      width: continueMessageWidth,
      height: continueMessageHeight,
      textAlign: "center",
      fontSize: continueMessageFontSize,
    },
  };

  scrollSpeed = 1 / 8;
  lineHeight = 1.5;

  onCreate() {
    const { text, bgm } = this.$state.map;
    this.textArr = text.split("\n");
    this.mapBgm = this.$sound.play("bgm", bgm);
  }

  onDestroy() {
    this.mapBgm.pause();
  }

  onMouseDown = () => {
    if (this.$state.map.events) {
      this.$state.map.events.forEach((event) => {
        const { type, data } = event;
        this.$event.emit(type, data);
      });
    }
  };

  render() {
    const { lineHeight } = this;
    const scrollTextStyle = this.styles.scrollText;
    if (scrollTextStyle.y + this.textArr.length * lineHeight > 0) {
      scrollTextStyle.y -= this.scrollSpeed;
    } else {
      this.ready = true;
    }
    return (
      <div style={this.styles.wrap}>
        {this.ready ? (
          <div
            style={this.styles.continueMessage}
            onMouseDown={this.onMouseDown}
          >
            点击继续
          </div>
        ) : (
          <div style={scrollTextStyle}>
            {this.textArr.map((text, index) => (
              <div style={{ y: index * lineHeight }}>{text}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
