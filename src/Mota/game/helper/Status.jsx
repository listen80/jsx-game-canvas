

export default class Status extends Component {
  styles = {
    wrap: { fontSize: 24, textAlign: "center", textBaseLine: "middle", y: 1 },
  };

  onCreate() {}

  render() {
    const { styles, $state } = this;
    const { save } = $state;

    const rowProperty = [
      { data: save.hero.lv, style: { sy: 2 } },
      { data: save.hero.hp, style: { sy: 3 } },
      { data: save.hero.atk, style: { sy: 4 } },
      { data: save.hero.def, style: { sy: 5 } },
      { data: save.hero.exp, style: { sy: 6 } },
      { data: save.money, style: { sy: 7 } },
      { data: save.items.yellowKey, style: { sy: 8 } },
      { data: save.items.blueKey, style: { sy: 9 } },
      { data: save.items.redKey, style: { sy: 10 } },
    ];

    return (
      <div style={styles.wrap}>
        {rowProperty.map(({ style, data }, index) => {
          return (
            <div style={{ y: index * 1.16 + 0.3 }}>
              <div image="icons" style={style} />
              <div style={{ x: 1.5, height: 1, width: 2.5 }}>{data}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
