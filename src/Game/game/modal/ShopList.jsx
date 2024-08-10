import Text from "#/Base/Text";
import Column from "#/Grid/Column";
import { toggleShowShopList, openShop } from "events/mota";

export default {
  onClick({ shop }) {
    this.$event.emit(toggleShowShopList);
    this.$event.emit(openShop, shop.id);
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
        <div
          text="选择商店"
          position={{ x: 4.5, y: 0.8 }}
          style={{ font: "25px 楷体" }}
        ></div>
        <Column
          position={{ x: 1, y: 1.5 }}
          render={this.$state.save.shops.map((shopid) => {
            const shop = this.$config.shopList[shopid];
            return (
              <div
                text={shop.title}
                shop={shop}
                size={{ height: 0.7, width: 7 }}
                backgroundColor={"rgba(0,0,0,.5)"}
                border={{ width: 0.2, color: "white" }}
                onClick={this.onClick}
              ></div>
            );
          })}
        ></Column>
      </div>
    );
  },
};
