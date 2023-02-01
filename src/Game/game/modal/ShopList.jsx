import Select from "../../components/Base/Select";

export default {
  onCreate() {
    const width = 7,
      height = 8;

    const x = (screenWidth - width) / 2;
    const y = 2;

    this.styles = {
      shopList: {
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
      select: { x: 1, y: 1.75, width: 5, fontSize: 16 },
    };
    const shops = this.$state.save.shops;
    this.options = shops.map((shopid) => {
      const shop = this.$state.config.shopList[shopid];
      return { text: shop.title, shopid };
    });
    this.options.push({
      text: "离开",
    });
  },

  onConfirm(option, index) {
    const { shopid } = option;
    this.$state.showShopList = !this.$state.showShopList;
    if (shopid) {
      this.$state.shopid = shopid;
    }
  },

  render() {
    const { styles } = this;
    return (
      <div style={styles.shopList}>
        <div style={styles.title}>商店选择</div>
        <Select
          style={styles.select}
          options={this.options}
          optionSize={{ height: 0.8 }}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  },
};
