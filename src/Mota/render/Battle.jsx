import { Component, KeyEventComponent } from 'Engine'

export default class Battle extends KeyEventComponent {
  tick = 0
  styles = {
    battle: {
      x: 48,
      y: 48,
      width: 32 * 15,
      height: 32 * 10,
      fontSize: 16,
      borderWidth: 3,
      borderColor: '#deb887',
      font: '32px sans-serif',
      swidth: 640,
      sheight: 320,
    },
    enemy: {
      x: 32 * 1,
      y: 32 * 1,
    },
    hero: {
      x: 32 * 10,
      y: 32 * 1,
    },
  }

  create () {
    this.enemy = JSON.parse(JSON.stringify(this.props.enemy))
    this.hero = this.props.hero
  }

  onKeyDown () {
    if (this.battleMsg) {
      this.props.onClose && this.props.onClose()
    }
  }

  render () {
    const enemy = this.enemy
    const hero = this.hero
    const tick = location.hostname === 'localhost' ? 1 : 5
    if (enemy.hp > 0) {
      this.tick++
      if (this.tick === tick) {
        this.$sound.play('se', 'attack.mp3')

        if (this.turn) {
          const atk = enemy.atk - hero.def
          if (atk > 0) {
            hero.hp -= atk
          }
        } else {
          const atk = hero.atk - enemy.def
          if (atk > 0) {
            enemy.hp -= atk
          }
          if (enemy.hp <= 0) {
            enemy.hp = 0
            const { exp, money } = enemy
            hero.exp += exp
            this.props.saveData.money += money
            this.battleMsg = `战斗胜利，获得${money}金币，${exp}经验`
          }
        }
        this.turn = !this.turn
        this.tick = 0
      }
    }

    const proprety = [{ text: '名称', key: 'name' }, { text: '生命', key: 'hp' }, { text: '攻击', key: 'atk' }, { text: '防御', key: 'def' }]
    const heroImageStyle = { x: 32, y: 32 * 4.5, swidth: 32, sheight: 32, width: 64, height: 64, sy: 0 }
    const enemyImageStyle = { x: 32, y: 32 * 4.5, swidth: 32, sheight: 32, width: 64, height: 64, sy: enemy.sy * 32 }
    const size = 64
    const vsStyle = { font: `bold ${size}px sans-serif`, x: 32 * (5 + 1.5), y: 32 * 2, height: size, width: size }
    const msgStyle = { fontSize: 24, height: 32, y: 32 * 8, width: 32 * 15 }
    return <img src="Battlebacks/mota.jpg" style={this.styles.battle}>
      {this.battleMsg && <div style={msgStyle}>{this.battleMsg}</div>}
      <div style={this.styles.enemy}>
        <img src="enemys.png" style={enemyImageStyle} />
        {proprety.map((item, index) => {
          return <div style={{ x: 0 * 32, y: index * 32 }}>
            <div style={{ width: 32 * 4, textAlign: 'left', height: 32 }}>{item.text}</div>
            <div style={{ width: 32 * 4, textAlign: 'right', height: 32 }}>{enemy[item.key]}</div>
          </div>
        })}
      </div>
      <div style={vsStyle}>VS</div>
      <div style={this.styles.hero}>
        <img src="Characters/hero.png" style={heroImageStyle} />
        {proprety.map((item, index) => {
          return <div style={{ x: 0 * 32, y: index * 32 }}>
            <div style={{ width: 32 * 4, textAlign: 'left', height: 32 }}>{hero[item.key]}</div>
            <div style={{ width: 32 * 4, textAlign: 'right', height: 32 }}>{item.text}</div>
          </div>
        })}
      </div>
    </img>
  }
}
