import Select from "@/components/Base/Select";

import { mediumWhiteBorder } from "@/constant/border";
import { font25 } from "@/constant/font";

const width = 8;
const height = 9;

export default {
  onCreate() {
    const { shopId } = this.$state;
    this.shopJSON = this.$loader.$resource.shops[shopId];

    if (!this.$state.save.shops.includes(shopId)) {
      this.$state.save.shops.push(shopId);
    }

    this.textArr = this.shopJSON.text.split(/\n/);
  },

  onConfirm(option, index) {
    const { need, effect } = option;
    if (need) {
      if (this.$event.emit("checkSaveByStr", need)) {
        this.$event.emit("setSaveByStr", need);
        this.$event.emit("setSaveByStr", effect);
      } else {
        this.$event.emit("message", "不行");
      }
    } else {
      this.$state.shopId = null;
    }
  },
  renderText() {
    return this.textArr.map((text, index) => (
      <view position={{ y: index / 2 }} text={text}></view>
    ));
  },

  render() {
    return (
      <view
        position={{
          x: this.$config.screen.width / 2,
          y: this.$config.screen.height / 2,
        }}
        size={{ width, height }}
        align="center"
        verticalAlign="middle"
        bgColor="black"
        border={mediumWhiteBorder}
      >
        <view
          text={this.shopJSON.title}
          position={{ x: width / 2, y: 0.8 }}
          style={{ font: font25 }}
        ></view>
        <view position={{ x: width / 2, y: 2 }}>{this.renderText()}</view>
        <Select position={{ x: width / 2, y: 5 }} options={this.shopJSON.choices} onConfirm={this.onConfirm} />
      </view>
    );
  },
};
