import { Component } from 'Engine'

const size = 32

export default class Battle extends Component {
  tick = 0;
  styles = {
    battle: {
      x: size,
      y: size,
      width: size * 16,
      height: size * 11,
      fontSize: 20,
      borderWidth: 3,
      borderColor: '#deb887',
      swidth: 640,
      sheight: 320,
    },
    enemy: {
      x: size * 1,
      y: size * 1,
    },
    hero: {
      x: size * 10,
      y: size * 1,
    },
  };

  create() {
    this.enemy = JSON.parse(JSON.stringify(this.props.enemy))
    this.hero = this.props.hero
  }

  onKeyDown ({ code }) {
    if (code === 'Space') {
      if (this.battleMsg) {
        this.props.onClose && this.props.onClose()
      }
    }
  }

  onClick () {
    if (this.battleMsg) {
      this.props.onClose && this.props.onClose()
    }
  }

  render() {
    const enemy = this.enemy
    const hero = this.hero
    const isDev = location.hostname === 'localhost'
    const tick = isDev ? 3 : 3
    if (enemy.hp > 0) {
      this.tick++
      if (this.tick === tick) {
        // isDev || this.$sound.play('se', 'attack.mp3')

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
            this.$state.save.money += money
            this.battleMsg = `战斗胜利，获得${money}金币，${exp}经验`
          }
        }
        this.turn = !this.turn
        this.tick = 0
      }
    }

    const proprety = [
      { text: '名称', key: 'name' },
      { text: '生命', key: 'hp' },
      { text: '攻击', key: 'atk' },
      { text: '防御', key: 'def' },
    ]
    const heroImageStyle = {
      x: size,
      y: size * 4.5,
      swidth: size,
      sheight: size,
      width: 64,
      height: 64,
      sy: 0,
    }
    const enemyImageStyle = {
      x: size,
      y: size * 4.5,
      swidth: size,
      sheight: size,
      width: 64,
      height: 64,
      sy: enemy.sy * size,
    }
    const size64 = 64
    const vsStyle = {
      x: size * (5 + 1.5),
      y: size * 2,
      height: size64,
      width: size64,
    }
    const msgStyle = { fontSize: 24, height: size, y: size * 8, width: size * 15 }
    return (
      <img src="Battlebacks/mota.jpg" style={this.styles.battle} onClick={this.onClick}>
        {this.battleMsg && <div style={msgStyle}>{this.battleMsg}</div>}
        <div style={this.styles.enemy}>
          <img src="enemys" style={enemyImageStyle} />
          {proprety.map((item, index) => {
            return (
              <div style={{ x: 0 * size, y: index * size }}>
                <div style={{ width: size * 4, textAlign: 'left', height: size }}>
                  {item.text}
                </div>
                <div style={{ width: size * 4, textAlign: 'right', height: size }}>
                  {enemy[item.key]}
                </div>
              </div>
            )
          })}
        </div>
        <div style={vsStyle}>VS</div>
        <div style={this.styles.hero}>
          <img src="Characters/hero.png" style={heroImageStyle} />
          {proprety.map((item, index) => {
            return (
              <div style={{ x: 0 * size, y: index * size }}>
                <div style={{ width: size * 4, textAlign: 'left', height: size }}>
                  {hero[item.key]}
                </div>
                <div style={{ width: size * 4, textAlign: 'right', height: size }}>
                  {item.text}
                </div>
              </div>
            )
          })}
        </div>
      </img>
    )
  }
}
