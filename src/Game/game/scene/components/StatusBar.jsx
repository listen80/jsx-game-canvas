import Text from "#/Base/Text";

export default {
  onCreate() {
    this.wrapProps = {
      style: {
        font: "24px 楷体",
      },
      position: { y: 1 },
    };
  },

  render() {
    const { wrapProps, props, $state } = this;
    const { save } = $state;

    const rowProperty = [
      { data: save.hero.lv, sposition: { sy: 2 } },
      { data: save.hero.hp, sposition: { sy: 3 } },
      { data: save.hero.atk, sposition: { sy: 4 } },
      { data: save.hero.def, sposition: { sy: 5 } },
      { data: save.hero.exp, sposition: { sy: 6 } },
      { data: save.money, sposition: { sy: 7 } },
      { data: save.items.yellowKey, sposition: { sy: 8 } },
      { data: save.items.blueKey, sposition: { sy: 9 } },
      { data: save.items.redKey, sposition: { sy: 10 } },
    ];

    return (
      <div {...wrapProps}>
        {rowProperty.map(({ sposition, data }, index) => {
          return (
            <div position={{ y: index * 1.2 + 0.2 }}>
              <div image="icons" sposition={sposition} />
              <Text
                position={{ x: 1.5 }}
                size={{ width: 2.5 }}
                value={data + ""}
              ></Text>
            </div>
          );
        })}
      </div>
    );
  },
};
