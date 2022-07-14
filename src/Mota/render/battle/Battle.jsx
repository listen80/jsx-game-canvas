import { registryComponents, Component } from "Engine"

export default class Battle extends Component {
  tick = 0;
  styles = {
    battle: {
      x: 1,
      y: 1,
      width: 16,
      height: 1 * 11,
      fontSize: 20,
      borderWidth: 3,
      borderColor: '#deb887',
      swidth: 640 / 32,
      sheight: 320 / 32,
    },
    enemy: {
      x: 1 * 1,
      y: 1 * 1,
    },
    hero: {
      x: 1 * 10,
      y: 1 * 1,
    },
  };

  onCreate() {
    this.$registry('battle', ($state, enemy, callback) => {
      this.enemy = JSON.parse(JSON.stringify(enemy))
      this.callback = callback
      this.turn = false
      this.tick = 0
      this.battleMsg = null
    })

    this.$registry('enemy', ($state, id, callback) => {
      this.enemy = JSON.parse(JSON.stringify($state.enemys[id]))
      this.callback = callback
      this.turn = false
      this.tick = 0
      this.battleMsg = null
    })


  }

  onMouseDown = () => {
    if (this.battleMsg) {
      this.enemy = null
      this.callback && this.callback()
    }
    return true
  }

  calc() {
    const enemy = this.enemy
    const save = this.$state.save
    const hero = save.hero
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
            save.money += money
            this.battleMsg = `战斗胜利，获得${money}金币，${exp}经验`
          }
        }
        this.turn = !this.turn
        this.tick = 0
      }
    }
  }

  loop = this.createLoop(1.5, 2, 2, 1 / 32, true)
  render() {
    if (!this.enemy) {
      return
    }
    this.calc()
    const enemy = this.enemy
    const hero = this.$state.save.hero

    const proprety = [
      { text: '名称', key: 'name' },
      { text: '生命', key: 'hp' },
      { text: '攻击', key: 'atk' },
      { text: '防御', key: 'def' },
    ]
    const heroImageStyle = {
      x: 1,
      y: 1 * 4.5,
      swidth: 1,
      sheight: 1,
      width: 64,
      height: 64,
      sy: 0,
    }
    const enemyImageStyle = {
      x: 1,
      y: 1 * 4.5,
      swidth: 1,
      sheight: 1,
      width: 64,
      height: 64,
      sy: enemy.sy * 1,
    }
    const size64 = 64
    const vsStyle = {
      x: 1 * (5 + 1.5),
      y: 1 * 2,
      height: size64,
      width: size64,
    }
    const y = this.loop()
    const msgStyle = { fontSize: 24, height: 1, y: 1 * 8, width: 1 * 15, textAlign: 'center' }
    return (
      <img src="Battlebacks/mota.jpg" style={this.styles.battle} onMouseDown={this.onMouseDown}>
        {
          this.battleMsg &&
          <div style={msgStyle}>
            {this.battleMsg}
            <div style={{ x: 8, y, height: 1 }}>↓</div>
          </div>
        }

        <div style={this.styles.enemy}>
          <img src="enemys" style={enemyImageStyle} />
          {proprety.map((item, index) => {
            return (
              <div style={{ x: 0 * 1, y: index * 1 }}>
                <div style={{ width: 1 * 4, textAlign: 'left', height: 1 }}>
                  {item.text}
                </div>
                <div style={{ width: 1 * 4, textAlign: 'right', height: 1 }}>
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
              <div style={{ x: 0 * 1, y: index * 1 }}>
                <div style={{ width: 1 * 4, textAlign: 'left', height: 1 }}>
                  {hero[item.key]}
                </div>
                <div style={{ width: 1 * 4, textAlign: 'right', height: 1 }}>
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
