import Column from "#/Grid/Column";
import { toggleShowShopList } from "events/mota";
import { openShop } from "events/common";
import { mediumWhiteBorder, thinWhiteBorder } from "@/constant/border";
import { font25 } from "@/constant/font";

export default {
  onClick({ text }) {
    this.$event.emit(toggleShowShopList);
    this.$event.emit(openShop, text);
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
        bgColor="black"
        border={mediumWhiteBorder}
      >
        <div
          text="选择商店"
          position={{ x: 4.5, y: 0.8 }}
          style={{ font: font25 }}
        ></div>
        <Column
          position={{ x: 1, y: 1.5 }}
          render={this.$state.save.shops.map((shopId) => {
            // const shop = this.$config.shopList[shopId];
            return (
              <div
                text={shopId}
                size={{ height: 0.7, width: 7 }}
                bgColor={"rgba(0,0,0,.5)"}
                border={thinWhiteBorder}
                // shop={shop}
                onClick={this.onClick}
              ></div>
            );
          })}
        ></Column>
      </div>
    );
  },
};
