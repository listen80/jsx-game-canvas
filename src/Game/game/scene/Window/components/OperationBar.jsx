export default {
  onCreate() {
    this.wrapProps = {
      position: { x: 18, y: 1 },
      style: { font: "24px 楷体" },
    };
  },

  onClick({ event, data }) {
    if (event) {
      this.$event.emit(event, data);
    }
  },

  render() {
    const { mapId, mapKey } = this.$state;
    const map = this.$loader.$resource.maps[mapId];
    const rowProperty = [
      {
        text: this.$config.title,
        sposition: { sy: 0 },
        event: "message",
        data: "啦啦啦",
      },
      {
        text: map.name,
        sposition: { sy: 1 },
        event: "message",
        data: "啦啦啦",
      },
      {
        text: "怪物",
        sposition: { sy: 11 },
        event: "toggleShowEnemyInfo",
      },
      {
        text: "罗盘",
        sposition: { sy: 12 },
        event: "toggleShowCompass",
      },
      {
        text: "商店",
        sposition: { sy: 13 },
        event: "toggleShowShopList",
      },
      {
        text: "统计",
        sposition: { sy: 17 },
        event: "toggleStaticList",
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
    ];
    const size = { width: 1, height: 1 };

    return (
      <view {...this.wrapProps}>
        {rowProperty.map(({ sposition, text, event, data }, index) => {
          return (
            <view
              position={{ y: index * 1.2 + 0.2 }}
              size={{ width: 4 }}
              event={event}
              data={data}
              onClick={this.onClick}
            >
              <view image="icons" size={size} sposition={sposition} />
              <view
                position={{ x: 1.5 }}
                size={{ height: 1, width: 2.5 }}
                text={text}
                bgColor={"rgba(0,0,0,.5)"}
              ></view>
            </view>
          );
        })}
      </view>
    );
  },
};
