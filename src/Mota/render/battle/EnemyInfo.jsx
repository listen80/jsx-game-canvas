import { Component } from "Engine";
import Table from "../../components/Table";
import Animate from "../../components/Animate";

const columns = [
  {
    title: null,
    width: 1,
    render(rowData) {
      return (
        <Animate
          data={{
            src: "enemys.png",
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
    dataIndex: "name",
    width: 2.5,
  },
  {
    title: "生命",
    dataIndex: "hp",
    width: 1.5,
  },
  {
    title: "攻击",
    dataIndex: "atk",
    width: 2,
  },
  {
    title: "防御",
    dataIndex: "def",
    width: 2,
  },
  {
    title: "损失",
    width: 2,
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
        <div style={{ color: "red", height: 1 }}>{needHp}</div>
      );
    }
  } else {
    return "-";
  }
}

function transform($state, value, x, y) {
  const info = $state.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  let maxTick = 1;
  const data = {
    src: type,
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

const size = 13

export default class EnemyInfo extends Component {
  styles = {
    wrap: {
      textAlign: "left",
      fontSize: 18,
      backgroundImage: "Background/ground.png",
      width:  (size - 2),
      x: 1,
      y: 1,
      height:  (size - 2),
    },
  };
  onCreate() {
    const set = new Set(
      this.$state.map.mapTerrains
        .map((line, y) => line.map((value, x) => value))
        .flat()
    );

    const values = Array.from(set)
      .map((value) => (value ? transform(this.$state, value) : null))
      .filter((v) => {
        return v && v.type === "enemys";
      });

    this.dataSource = values.map(({ name, enemy }) => {
      this.$state.enemys[name].battleResult = checkBattle(
        enemy,
        this.$state.save.hero
      );
      return this.$state.enemys[name];
    });
  }

  render() {
    const { dataSource, styles } = this;
    return (
      <div style={styles.wrap} onMouseDown={this.onMouseDown}>
        <Table
          dataSource={dataSource}
          columns={columns}
          dataExtra={this.$state.save.hero}
        />
      </div>
    );
  }
}
