import Text from "../components/Text";

export default {
  onCreate() {
    this.styles = {
      wrap: {
        position: { y: 1 },
        style: { font: "24px 楷体" },
      },
    };

    this.attrs = {
      wrap: {
        style: {
          font: "24px 楷体",
        },
        position: { y: 1 },
      },
    };
    const { $state, $config } = this;
    const { map } = $state;

    this.rowProperty = [
      { text: $config.title, sposition: { sy: 0 } },
      { text: map.name, sposition: { sy: 1 } },
      {
        text: "怪物",
        sposition: { sy: 11 },
        event: "toggleShowEnemyInfo",
      },
      {
        text: "楼层",
        sposition: { sy: 12 },
        event: "toggleShowJumpFloor",
      },
      {
        text: "商店",
        sposition: { sy: 13 },
        event: "showShopList",
      },
      {
        text: "读档",
        sposition: { sy: 15 },
        event: "loadGame",
      },
      {
        text: "存档",
        sposition: { sy: 14 },
        event: "saveGame",
      },
      {
        text: "设置",
        sposition: { sy: 16 },
        event: "toggleShowConfig",
      },
      {
        text: "统计",
        sposition: { sy: 17 },
        event: "gotoTitle",
      },
    ];
  },

  onClick(attrs) {
    this.$event.emit(attrs.event)
  },

  render() {
    const { attrs, rowProperty } = this;

    const node = (
      <div {...attrs.wrap}>
        {rowProperty.map(({ sposition, text, event }, index) => {
          return (
            <div
              event={event}
              position={{ y: index * 1.2 + 0.2 }}
              size={{ width: 4 }}
              onClick={this.onClick}
            >
              <div image="icons" sposition={sposition} />
              <Text
                position={{ x: 1.5, y: 0 }}
                size={{ height: 1, width: 2.5 }}
                value={text}
              ></Text>
            </div>
          );
        })}
      </div>
    );
    return node;
  },
};
