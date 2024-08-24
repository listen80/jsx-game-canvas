export default {
  onCreate () {
    this.enemy = JSON.parse(JSON.stringify(this.$state.enemy))
    this.callback = callback
    this.turn = false
    this.tick = 0
    this.battleMsg = null

    this.styles = {
      battle: {
        x: 1,
        y: 1,
        width: 16,
        height: 11,
        fontSize: 20,
        borderWidth: 3,
        borderColor: '#deb887',
        swidth: 640 / 32,
        sheight: 320 / 32,
      },
      enemy: {
        x: 1,
        y: 1,
      },
      hero: {
        x: 10,
        y: 1,
      },
      heroImageStyle: {
        x: 1,
        y: 4.5,
        swidth: 1,
        sheight: 1,
        width: 2,
        height: 2,
        sy: 0,
      },
      enemyImageStyle: {
        x: 1,
        y: 4.5,
        swidth: 1,
        sheight: 1,
        width: 2,
        height: 2,
      },
    }
    this.loop = this.createLoop(1.5, 2, 2, 1 / 32, true)

    this.proprety = [
      { text: '名称', key: 'name' },
      { text: '生命', key: 'hp' },
      { text: '攻击', key: 'atk' },
      { text: '防御', key: 'def' },
    ]
    // this.$event.on("battle", ($state, enemy, callback) => {
    //   this.enemy = JSON.parse(JSON.stringify(enemy));
    //   this.callback = callback;
    //   this.turn = false;
    //   this.tick = 0;
    //   this.battleMsg = null;
    // });

    // this.$event.on("enemy", ($state, id, callback) => {});
  },

  onClick () {
    if (this.battleMsg) {
      this.enemy = null
      this.callback && this.callback()
    }
    return true
  },

  calc () {
    const enemy = this.enemy
    const save = this.$state.save
    const hero = save.hero
    const tick = 3
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
  },

  render () {
    this.calc()
    const enemy = this.enemy
    const hero = this.$state.save.hero

    const enemyImageStyle = {
      x: 1,
      y: 4.5,
      swidth: 1,
      sheight: 1,
      width: 2,
      height: 2,
      sy: enemy.sy * 1,
    }
    const size64 = 64
    const vsStyle = {
      x: 5 + 1.5,
      y: 2,
      height: size64,
      width: size64,
    }
    const y = this.loop()
    const msgStyle = {
      fontSize: 24,
      height: 1,
      y: 8,
      width: 15,
      textAlign: 'center',
    }
    const { styles } = this
    return (
      <view
        image="Battlebacks/mota.jpg"
        style={this.styles.battle}
        onClick={this.onClick}
      >
        {this.battleMsg && (
          <view style={msgStyle}>
            {this.battleMsg}
            <view style={{ x: 8, y, height: 1 }}>↓</view>
          </view>
        )}

        <view style={this.styles.enemy}>
          <view image="enemys" style={styles.enemyImageStyle} />
          {this.proprety.map((item, index) => {
            return (
              <view style={{ x: 0 * 1, y: index * 1 }}>
                <view style={{ width: 4, textAlign: 'left', height: 1 }}>
                  {item.text}
                </view>
                <view style={{ width: 4, textAlign: 'right', height: 1 }}>
                  {enemy[item.key]}
                </view>
              </view>
            )
          })}
        </view>
        <view style={vsStyle}>VS</view>
        <view style={this.styles.hero}>
          <view image="Characters/hero.png" style={styles.heroImageStyle} />
          {this.proprety.map((item, index) => {
            return (
              <view style={{ x: 0 * 1, y: index * 1 }}>
                <view style={{ width: 4, textAlign: 'left', height: 1 }}>
                  {hero[item.key]}
                </view>
                <view style={{ width: 4, textAlign: 'right', height: 1 }}>
                  {item.text}
                </view>
              </view>
            )
          })}
        </view>
      </view>
    )
  },
}
