import Text from "#/Base/Text";

export default {
  onCreate() {
    this.wrapProps = {
      position: { x: 1, y: 1 },
      style: { font: "24px 楷体" },
    };
  },

  onClick({ event, data }) {
    if (event) {
      this.$event.emit(event, data);
    }
  },

  render() {
    const { wrapProps, $state } = this;
    const { save } = $state;

    const rowProperty = [
      {
        text: save.hero.lv,
        sposition: { sy: 2 },
        event: "message",
        data: "属性",
      },
      {
        text: save.hero.hp,
        sposition: { sy: 3 },
        event: "message",
        data: "属性",
      },
      {
        text: save.hero.atk,
        sposition: { sy: 4 },
        event: "message",
        data: "属性",
      },
      {
        text: save.hero.def,
        sposition: { sy: 5 },
        event: "message",
        data: "属性",
      },
      {
        text: save.hero.exp,
        sposition: { sy: 6 },
        event: "message",
        data: "属性",
      },
      {
        text: save.money,
        sposition: { sy: 7 },
        event: "message",
        data: "属性",
      },
      {
        text: save.items.yellowKey,
        sposition: { sy: 8 },
        event: "message",
        data: "属性",
      },
      {
        text: save.items.blueKey,
        sposition: { sy: 9 },
        event: "message",
        data: "属性",
      },
      {
        text: save.items.redKey,
        sposition: { sy: 10 },
        event: "message",
        data: "属性",
      },
    ];

    const size = { width: 1, height: 1 };
    return (
      <div {...wrapProps}>
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
                bgColor={"rgba(0,0,0,.5)"}
                text={text}
              ></div>
            </div>
          );
        })}
      </div>
    );
  },
};
