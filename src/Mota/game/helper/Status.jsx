import Text from "../../components/Text";
export default {

  onCreate() {
    this.styles = {
      wrap: {
        // fontSize: 24,
        // textAlign: "center", 
        // textBaseLine: "middle", 
        position: { y: 1 }
      },
    }
  },

  render() {
    const { styles, $state } = this;
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
      <div {...styles.wrap}>
        {rowProperty.map(({ sposition, data }, index) => {
          return (
            <div position={{ y: index * 1.16 + 0.3 }}>
              <div image="icons" sposition={sposition} />
              <Text position={{ x: 1.5 }} size={{ width: 2.5 }} value={data + ''}></Text>
            </div>
          );
        })}
      </div>
    );
  }
}
