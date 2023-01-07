import { Component } from "Engine";
import Select from "Mota/components/Select";
import { screenWidth } from "../../config";

const width = 7,
  height = 8;

const x = (screenWidth - width) / 2;
const y = 2;

export default class Shop extends Component {
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
    const shopid = this.$state.shopid;

    if (!this.$state.save.shops.includes(shopid)) {
      this.$state.save.shops.push(shopid);
    }

    const shopList = this.$state.config.shopList;

    this.shop = shopList[shopid];

    this.options = this.shop.choices.slice();
    this.options.push({
      text: "离开",
    });
    this.text = this.shop.text.split(/\n/);
  }

  onConfirm = (option, index) => {
    const { need, effect } = option;
    if (need) {
      if (this.$emit("checkSaveByStr", need)) {
        this.$emit("setSaveByStr", need);
        this.$emit("setSaveByStr", effect);
      } else {
        this.$emit("setMessage", "不行");
      }
    } else {
      this.$state.shopid = null;
    }
  };

  renderText() {
    return this.text.map((text, index) => (
      <div style={{ x: width / 2, y: index / 2 }}>{text}</div>
    ));
  }

  render() {
    const { styles } = this;
    return (
      <div style={styles.shop}>
        <div style={styles.title}>{this.shop.title}</div>
        <div style={styles.text}>{this.renderText()}</div>
        <Select
          style={styles.select}
          options={this.options}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  }
}
