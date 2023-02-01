import Text from "#/Base/Text";
import Column from "#/Grid/Column";
import { toggleShowShopList, openShop } from "events/mota";

export default {
  onClick({ shopid }, index) {
    this.$event.emit(toggleShowShopList);
    this.$event.emit(openShop);
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
                shop={shop}
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
