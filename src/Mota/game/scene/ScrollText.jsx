

import Text from "../components/Text"

export default {
  onCreate() {

    const { text, bgm } = this.$state.map;

    this.mapBgm = this.$sound.play("bgm", bgm);
    this.textArr = text.split("\n");

    const screenWidth = this.$config.screen.width
    const screenHeight = this.$config.screen.height
    this.scrollSpeed = 8;
    this.lineHeight = 1.5;

    const continueMessageFontSize = 64;

    this.attrs = {
      scrollText: {
        position: {
          x: 1,
          y: 13,
        },
        style: {
          font: "24px 楷体",
          textAlign: "left",
          textBaseline: "top",
        },
      },
      continueMessage: {
        align: "center",
        verticalAlign: "middle",
        style: {
          font: `${continueMessageFontSize}px 楷体`,
        },
        size: {
          width: continueMessageFontSize / 32 * 4,
          height: continueMessageFontSize / 32,
        },
        position: {
          x: screenWidth / 2,
          y: screenHeight / 2,
        },
        backgroundColor: "red",
      }
    }

    this.max = this.textArr.length * this.lineHeight;
  },

  onDestroy() {
    this.mapBgm.pause();
  },

  onClick() {
    if (this.$state.map.events) {
      this.$state.map.events.forEach((event) => {
        const { type, data } = event;
        this.$event.emit(type, data);
      });
    }
  },

  render() {
    const { lineHeight } = this;
    const scrollTextStyle = this.attrs.scrollText.position;

    if (scrollTextStyle.y + this.max > 0) {
      scrollTextStyle.y -= this.scrollSpeed;
    } else {
      if (__DEV__) {
        this.onClick()
      }
      this.ready = true;
    }

    return this.ready ?
      <Text
        {...this.attrs.continueMessage}
        onClick={this.onClick}
        border={{ width: 3 }}
        value={"点击继续"}
      >
      </Text>
      :
      <div {...this.attrs.scrollText}>
        {
          this.textArr.map((text, index) => (
            <div position={{ y: index * lineHeight }} text={text}></div>
          ))
        }
      </div>

  }
}
