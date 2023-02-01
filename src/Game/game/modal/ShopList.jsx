import Text from "#/Base/Text";
import Column from "#/Grid/Column";

export default {
  onConfirm(option, index) {
    const { shopid } = option;
    this.$state.showShopList = !this.$state.showShopList;
    if (shopid) {
      this.$state.shopid = shopid;
    }
  },

  render() {
    return (
      <div
        position={{
          x: this.$config.screen.width / 2,
          y: this.$config.screen.height / 2,
        }}
        size={{ width: 9, height: 8 }}
        align="center"
        verticalAlign="middle"
        backgroundColor="black"
        border={{ width: 2, color: "white" }}
      >
        <Text value="选择商店" size={{ width: 9 }}></Text>
        <Column
          position={{ y: 1.5 }}
          render={this.$state.save.shops.map((shopid) => {
            const shop = this.$config.shopList[shopid];
            return (
              <Text
                value={shop.title}
                size={{ width: 9 }}
                onClick={this.onClick}
              ></Text>
            );
          })}
        ></Column>
      </div>
    );
  },
};
