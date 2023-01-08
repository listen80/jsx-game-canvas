import { Component } from "Engine";
import Table from "../../components/Table";
import Animate from "../../components/Animate";
import { screenWidth } from "../../config";

const columns = [
  {
    title: null,
    width: 1,
    height: 0.7,
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
        <div style={{ color: "red", height: 1 }}>{needHp}</div>
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

const width = 11;
const y = 1;
const x = (screenWidth - width) / 2;


export default class EnemyInfo extends Component {
  styles = {
    enemyList: {
      x,
      y,
      width: width,
      height: width,
      borderWidth: 4,
      borderColor: "white",
      fontSize: 16,
      backgroundColor: "black",
    },
    table: {
      y: 0.5
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

  onMouseDown = () => {
    this.$state.showEnemyInfo = false;
  };

  render() {
    const { dataSource, styles } = this;
    return (
      <div style={styles.enemyList}>
        <Table style={styles.table}
          dataSource={dataSource}
          columns={columns}
          dataExtra={this.$state.save.hero}
        />
        <div style={styles.close} onMouseDown={this.onMouseDown}>
          x
        </div>
      </div>
    );
  }
}
