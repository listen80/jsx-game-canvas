import Text from "#/Base/Text";

export default {
  onCreate() {
    this.wrapProps = {
      position: { x: 1, y: 1 },
      style: { font: "24px 楷体" },
    };
  },

  onClick({ event }) {
    // if (event) {
    //   this.$event.emit(event);
    // }
    const { save } = this.$state;
    save.hero.atk += 10;
  },

  render() {
    const { wrapProps, $state } = this;
    const { save } = $state;

    const rowProperty = [
      { text: save.hero.lv, sposition: { sy: 2 } },
      { text: save.hero.hp, sposition: { sy: 3 } },
      { text: save.hero.atk, sposition: { sy: 4 } },
      { text: save.hero.def, sposition: { sy: 5 } },
      { text: save.hero.exp, sposition: { sy: 6 } },
      { text: save.money, sposition: { sy: 7 } },
      { text: save.items.yellowKey, sposition: { sy: 8 } },
      { text: save.items.blueKey, sposition: { sy: 9 } },
      { text: save.items.redKey, sposition: { sy: 10 } },
    ];

    const size = { width: 1, height: 1 };
    return (
      <div {...wrapProps}>
        {rowProperty.map(({ sposition, text, event }, index) => {
          return (
            <div
              position={{ y: index * 1.2 + 0.2 }}
              size={{ width: 4 }}
              event={event}
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
