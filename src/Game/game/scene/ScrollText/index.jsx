import Text from "#/Base/Text";

export default {
  onCreate() {
    const { text, bgm } = this.$state.map;

    this.mapBgm = this.$sound.play("bgm", bgm);

    this.textArr = text.split("\n");

    const screenWidth = this.$config.screen.width;
    const screenHeight = this.$config.screen.height;

    this.scrollSpeed = 1 / 16;
    this.scrollSpeed = 1;
    this.lineHeight = 1.5;

    const continueMessageFontSize = 64;

    this.scrollText = {
      position: {
        x: 1,
        y: 13,
      },
      style: {
        font: "24px 楷体",
        textAlign: "left",
        textBaseline: "top",
      },
    };

    this.continueMessage = {
      align: "center",
      verticalAlign: "middle",
      style: {
        font: `${continueMessageFontSize}px 楷体`,
      },
      // size: {
      //   width: (continueMessageFontSize / 32) * 4,
      //   height: continueMessageFontSize / 32,
      // },
      position: {
        x: screenWidth / 2,
        y: screenHeight / 2,
      },
      bgColor: "red",
      // border: { width: 3 }
    };

    this.max = this.textArr.length * this.lineHeight;
    // this.onClick()
  },

  onDestroy() {
    this.mapBgm.pause();
  },

  onClick() {
    this.$event.emit('startGame')
    // if (this.$state.map.events) {
    //   this.$state.map.events.forEach((event) => {
    //     const { type, data } = event;
    //     this.$event.emit(type, data);
    //   });
    // }
  },

  renderContinue() {
    return (
      <div
        {...this.continueMessage}
        onClick={this.onClick}
        text="点击继续"
      ></div>
    );
  },

  renderScrollText() {
    const { lineHeight } = this;
    return (
      <div {...this.scrollText}>
        {this.textArr.map((text, index) => (
          <div position={{ y: index * lineHeight }} text={text}></div>
        ))}
      </div>
    );
  },

  render() {
    const scrollTextStyle = this.scrollText.position;

    if (scrollTextStyle.y + this.max > 0) {
      scrollTextStyle.y -= this.scrollSpeed;
    } else {
      this.ready = true;
    }

    return this.ready ? this.renderContinue() : this.renderScrollText();
  },
};
