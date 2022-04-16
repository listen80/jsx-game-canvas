import { Component, Animate, Table } from 'Engine'

const size = 32
const styles = {
  wrap: {
    textAlign: 'left',
    fontSize: 18,
    backgroundImage: 'ground.png',
    width: size * (13 + 5 - 2),
    x: size,
    y: size,
    height: size * (13 - 2),
  },
}

const columns = [
  {
    title: null,
    width: 1,
    render (rowData) {
      return (
        <Animate
          data={{
            src: 'enemys.png',
            maxTick: 2,
            width: size,
            height: size,
            maxInterval: 10,
            sy: rowData.sy,
          }}
        />
      )
    },
  },
  {
    title: '名字',
    dataIndex: 'name',
    width: 3,
  },
  {
    title: '生命',
    dataIndex: 'hp',
    width: 2,
  },
  {
    title: '攻击',
    dataIndex: 'atk',
    width: 2,
  },
  {
    title: '防御',
    dataIndex: 'def',
    width: 2,
  },
  {
    title: '损失',
    dataIndex: 'address',
    width: 2,
    render (enemy, hero) {
      if (hero.atk > enemy.def) {
        if (
          hero.def >= enemy.atk ||
          enemy.hp / (hero.atk - enemy.def) <= hero.hp / (enemy.atk - hero.def)
        ) {
          if (hero.def >= enemy.atk) {
            return 0
          } else {
            const atkCount = Math.floor(enemy.hp / (hero.atk - enemy.def))
            return (enemy.atk - hero.def) * atkCount
          }
        }
      }
      return '-'
    },
  },
]

export default class EnemyInfo extends Component {
  onKeyDown () {
    this.props.onClose()
  }

  onMouseDown = () => {
    this.props.onClose()
  };

  render () {
    const dataSource = Object.keys(this.props.enemys).map(
      (enemyId) => this.$data.enemys[enemyId],
    )
    return (
      <div style={styles.wrap} onMouseDown={this.onMouseDown}>
        <Table
          dataSource={dataSource}
          columns={columns}
          data={this.$data.save.hero}
        />
      </div>
    )
  }
}
