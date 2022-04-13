import { KeyEventComponent, Component } from 'Engine'

const styles = {
  wrap: {
    textAlign: 'left',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,1)',
    backgroundImage: 'ground.png',
    borderColor: 'yellow',
    borderWidth: 1,
    width: 32 * (13 + 5),
    height: 32 * 13,
  },
  tableoffset: { x: 32, y: 32 },
}

const columns = [
  {
    title: '',
    width: 1,
    render (rowData) {
      return <div src="enemys.png" style={{ height: 32, width: 32, sy: rowData.sy * 32, backgroundColor: 'red' }}/>

      return <img src="enemys.png" style={{ height: 32, width: 32, sy: rowData.sy * 32 }}/>
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
      let cost = 0
      if (hero.atk > enemy.def) {
        if (hero.def >= enemy.atk || enemy.hp / (hero.atk - enemy.def) <= hero.hp / (enemy.atk - hero.def)) {
          if (hero.def >= enemy.atk) {
            cost = 0
          } else {
            const atkCount = Math.floor(
              enemy.hp / (hero.atk - enemy.def),
            )
            cost = (enemy.atk - hero.def) * atkCount
          }
        } else {
          cost = '-'
        }
      } else {
        cost = '-'
      }
      return cost
    },
  },
]

class Table extends Component {
  render () {
    const { dataSource, columns, size = 32, data } = this.props
    let x = 0
    return columns.map((column, index) => {
      const { title, dataIndex, width, render } = column
      const rowEle = <div style={{ x: 0, y: 0, textAlign: 'start', textBaseline: 'top' }}>
        <div style={{ x: x, width: width * size, height: size }}>{title}</div>
        {dataSource.map((rowData, rowIndex) => {
          return <div style={{ x: x, y: (rowIndex + 1) * size, width: width * size, height: size }}>{render ? render.call(this, rowData, data, rowIndex, index) : rowData[dataIndex]}</div>
        })}
      </div>
      x += width * size
      return rowEle
    })
  }
}
export default class EnemyInfo extends KeyEventComponent {
  onKeyDown ({ code }) {
    if (code === 'KeyX') {
      this.props.onClose()
    }
  }

  onMouseDown () {
    this.props.onClose()
  }

  render () {
    const dataSource = Object.keys(this.props.enemys).map(enemyId => this.$data.enemys[enemyId])
    return <div style={styles.wrap}>
        <div style={styles.tableoffset}>
          <Table dataSource={dataSource} columns={columns} data={this.$data.save.hero}/>
        </div>
      </div>
  }
}
