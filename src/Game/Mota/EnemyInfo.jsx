import { KeyEventComponent } from 'Engine'

export default class Hero extends KeyEventComponent {
  onKeyDown ({ code }) {
    if (code === 'KeyX') {
      this.props.onClose()
    }
  }

  render () {
    const enemys = Object.keys(this.props.enemys)
    return (
      <div
        style={{
          textAlign: 'left',
          fontSize: 16,
          backgroundColor: 'rgba(0,0,0,.8)',
          width: 32 * 18,
          height: 32 * 13,
        }}
      >
        <div style={{ x: 32, y: 32 }}>
          <div style={{ x: 32 * 1, height: 32 }}>名字</div>
          <div style={{ x: 32 * 4, height: 32 }}>生命</div>
          <div style={{ x: 32 * 6, height: 32 }}>攻击</div>
          <div style={{ x: 32 * 8, height: 32 }}>防御</div>
          <div style={{ x: 32 * 10, height: 32 }}>损失</div>
          {enemys.map((enemyId, index) => {
            const style = {
              x: 0,
              y: index * 32 + 32,
              height: 32,
            }
            const enemy = window.$res.enemys[enemyId]
            const hero = this.props.saveData.hero
            let cost = 0
            if (hero.atk > enemy.def) {
              if (
                hero.def >= enemy.atk ||
                enemy.hp / (hero.atk - enemy.def) <=
                  hero.hp / (enemy.atk - hero.def)
              ) {
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
            return (
              <div style={style}>
                <img src="enemys.png" alt="" style={{ height: 32, width: 32, sy: enemy.sy * 32 }}/>
                <div style={{ x: 32 * 1, height: 32 }}>{enemy.name}</div>
                <div style={{ x: 32 * 4, height: 32 }}>{enemy.hp}</div>
                <div style={{ x: 32 * 6, height: 32 }}>{enemy.atk}</div>
                <div style={{ x: 32 * 8, height: 32 }}>{enemy.def}</div>
                <div style={{ x: 32 * 10, height: 32 }}>{cost}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
