import Text from "#/Base/Text";

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
    const rowProperty = [
      {
        text: this.$config.title,
        sposition: { sy: 0 },
        event: "message",
        data: "啦啦啦",
      },
      {
        text: this.$state.map.name,
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
      <div {...this.wrapProps}>
        {rowProperty.map(({ sposition, text, event, data }, index) => {
          return (
            <div
              position={{ y: index * 1.2 + 0.2 }}
              size={{ width: 4 }}
              event={event}
              data={data}
              onClick={this.onClick}
            >
              <div image="icons" size={size} sposition={sposition} />
              <div
                position={{ x: 1.5 }}
                size={{ height: 1, width: 2.5 }}
                text={text}
                backgroundColor={"rgba(0,0,0,.5)"}
              ></div>
            </div>
          );
        })}
      </div>
    );
  },
};
