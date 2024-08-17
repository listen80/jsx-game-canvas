import Table from "#/Data/Table";
import { transform } from "@/transform";

const columns = [
  {
    title: null,
    width: 1,
    height: 1.2,
    render({ rowIndex }) {
      return (
        <div
          image={"enemys"}
          // position={{ x, y }}
          sposition={{ sx: 0, sy: rowIndex }}
          size={{ width: 1, height: 1 }}
          // bgColor={"yellow"}
          // border={{ width: 3 }}
        ></div>
      );
    },
  },
  {
    title: "名字",
    width: 2.5,
    height: 1,
    dataIndex: "name",
    render({ rowData, column }) {
      return (
        <div
          text={rowData[column.dataIndex]}
          size={{ width: column.width, height: column.height }}
          // bgColor={"red"}
        ></div>
      );
    },
  },
  {
    title: "生命",
    width: 1.5,
    height: 1,
    dataIndex: "hp",
    render({ rowData, column }) {
      return (
        <div
          text={rowData[column.dataIndex]}
          size={{ width: column.width, height: column.height }}
          // bgColor={"#ccc"}
        ></div>
      );
    },
  },
  {
    title: "攻击",
    width: 2,
    height: 1,
    dataIndex: "atk",
    render({ rowData, column }) {
      return (
        <div
          text={rowData[column.dataIndex]}
          size={{ width: column.width, height: column.height }}
          // bgColor={"#abc"}
        ></div>
      );
    },
  },
  {
    title: "防御",
    width: 2,
    height: 1,
    dataIndex: "def",
    render({ rowData, column }) {
      return (
        <div
          text={rowData[column.dataIndex]}
          size={{ width: column.width, height: column.height }}
          // bgColor={"#eee"}
        ></div>
      );
    },
  },
  {
    title: "损失",
    width: 2,
    height: 0.7,
    dataIndex: "battleResult",
    render({ rowData, column }) {
      return (
        <div
          text={rowData[column.dataIndex]}
          size={{ width: column.width, height: column.height }}
        ></div>
      );
    },
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

export default {
  onCreate() {
    this.dataSource = Object.values(
      this.$loader.$resource.sprites.enemys
    ).slice(0, 5);
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
        bgColor="black"
        border={{ width: 2, color: "white" }}
      >
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  },
};
