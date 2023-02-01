import Table from "#/Data/Table";
import Animate from "#/Base/Animate";

const columns = [
  {
    title: null,
    width: 1,
    height: 0.7,
    render(rowData) {
      return (
        <Animate
          data={{
            image: "enemys.png",
            maxTick: 2,
            width: 1,
            height: 1,
            maxInterval: 10,
            sy: rowData.sy,
          }}
        />
      );
    },
  },
  {
    title: "名字",
    width: 2.5,
    height: 0.7,
    dataIndex: "name",
  },
  {
    title: "生命",
    width: 1.5,
    height: 0.7,
    dataIndex: "hp",
  },
  {
    title: "攻击",
    width: 2,
    height: 0.7,
    dataIndex: "atk",
  },
  {
    title: "防御",
    width: 2,
    height: 0.7,
    dataIndex: "def",
  },
  {
    title: "损失",
    width: 2,
    height: 0.7,
    dataIndex: "battleResult",
  },
];

function checkBattle(enemy, hero) {
  if (hero.atk > enemy.def) {
    if (hero.def >= enemy.atk) {
      return 0;
    } else {
      const atkCount = Math.floor(enemy.hp / (hero.atk - enemy.def));
      const needHp = (enemy.atk - hero.def) * atkCount;
      return hero.hp > needHp ? (
        needHp
      ) : (
        <div style={{ fillStyle: "red", height: 1 }}>{needHp}</div>
      );
    }
  } else {
    return "-";
  }
}

function transform($state, $loader, value, x, y) {
  const info = $loader.$resource.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  let maxTick = 1;
  const data = {
    image: type,
    sy: detail.sy,
    type,
    name,
    // ...info,
    // x: x,
    // y: y,
    maxInterval: 10,
  };
  if (type === "animates") {
    maxTick = 4;
  } else if (type === "terrains" || type === "items") {
    maxTick = 1;
  } else if (type === "npcs" || type === "enemys") {
    maxTick = 2;
  }
  if (type === "enemys") {
    const enemy = $state.enemys[name];
    data.enemy = enemy;
    maxTick = 2;
  }
  data.maxTick = maxTick;
  return data;
}

export default {
  onCreate() {
    const wrapWidth = 11;

    const { width, height } = this.$config.screen;
    const x = (width - wrapWidth) / 2;
    const y = 1;
    this.styles = {
      enemyList: {
        x,
        y,
        // width: width,
        // height: width,
        borderWidth: 4,
        borderColor: "white",
        fontSize: 16,
        backgroundColor: "black",
      },
      table: {
        y: 0.5,
      },
      close: {
        x: 10,
        y: 10,
        height: 1,
        width: 1,
        textAlign: "center",
        // backgroundColor: "red",
        fontSize: 24,
      },
    };

    this.styles.enemyList.x = x;
    this.styles.enemyList.y = y;

    const set = new Set(
      this.$state.map.mapTerrains
        .map((line, y) => line.map((value, x) => value))
        .flat()
    );

    const values =
      [] ||
      Array.from(set)
        .map((value) => (value ? transform(this.$state, value) : null))
        .filter((v) => {
          return v && v.type === "enemys";
        });
    console.log(this.$state.map)
    this.dataSource = values.map(({ name, enemy }) => {
      this.$state.enemys[name].battleResult = checkBattle(
        enemy,
        this.$state.save.hero
      );
      return this.$state.enemys[name];
    });
  },

  render() {
    const { dataSource } = this;
    return (
      <div
        position={{
          x: this.$config.screen.width / 2,
          y: this.$config.screen.height / 2,
        }}
        size={{ width: 9, height: 11 }}
        align="center"
        verticalAlign="middle"
        backgroundColor="black"
        border={{ width: 2, color: "white" }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          dataExtra={this.$state.save.hero}
        />
      </div>
    );
  },
};
