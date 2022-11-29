const columns = [
  {
    title: null,
    width: 1,
    render (rowData) {
      return (
        <animate
          data={{
            src: 'enemys.png',
            maxTick: 2,
            width: 1,
            height: 1,
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
        if (hero.def >= enemy.atk) {
          return 0
        } else {
          const atkCount = Math.floor(enemy.hp / (hero.atk - enemy.def))
          const needHp = (enemy.atk - hero.def) * atkCount
          return hero.hp > needHp ? needHp : <div style={{ color: 'red', height: 1 }}>{needHp}</div>
        }
      } else {
        return '-'
      }
    },
  },
]

export default class EnemyInfo extends window.Component {
  onKeyDown ({ $key }) {
    if ($key === 'confirm') {
      this.props.onClose()
    }
  }

  onMouseDown = () => {
    this.props.onClose()
  };

  render () {
    const styles = {
      wrap: {
        textAlign: 'left',
        fontSize: 18,
        backgroundImage: 'ground.png',
        width: 1 * (13 + 5 - 2),
        x: 1,
        y: 1,
        height: 1 * (13 - 2),
      },
    }

    const dataSource = Object.keys(this.props.enemys).map((enemyId) => this.$state.enemys[enemyId])
    return (
      <div style={styles.wrap} onMouseDown={this.onMouseDown}>
        <Table
          dataSource={dataSource}
          columns={columns}
          data={this.$state.save.hero}
        />
      </div>
    )
  }
}
