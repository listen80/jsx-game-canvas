import { KeyEventComponent } from 'Engine'

import Menu from './Menu'
import Shop from './Shop'
import Battle from './Battle'
import Talks from './Talks'
import Message from './Message'
import EnemyInfo from './EnemyInfo'
import ShopList from './ShopList'

import { saveGame, loadGame } from '../sl'
import { isCoincided, updateVector, assignVector } from '../physics'
import { convertPropertyStr } from '../utils'

const propertyNames = {
  lv: '等级',
  money: '金币',
  hp: '生命',
  atk: '攻击',
  def: '防御',
  exp: '经验',
}
export default class Hero extends KeyEventComponent {
  tick = 0;
  create () {
    const hero = Object.assign(this.props.saveData.position, {
      width: 32,
      height: 32,
    })

    this.styles = { hero }
  }

  isCoincidedTerrains (heroStyle) {
    return this.props.mapTerrains.findIndex(
      (item) => item && item && isCoincided(item.props.style, heroStyle),
    )
  }

  isCoincidedEvents (heroStyle) {
    return this.props.mapEvents.findIndex(
      (item) => item && item && isCoincided(item.props.style, heroStyle),
    )
  }

  onKeyDown (e) {
    const { code } = e
    const styleHero = this.styles.hero
    const step = 32
    let moveVector = null
    if (code === 'ArrowDown') {
      moveVector = { y: step }
      styleHero.sy = 0
    } else if (code === 'ArrowUp') {
      moveVector = { y: -step }
      styleHero.sy = 96
    } else if (code === 'ArrowLeft') {
      moveVector = { x: -step }
      styleHero.sy = 32
    } else if (code === 'ArrowRight') {
      moveVector = { x: step }
      styleHero.sy = 64
    } else if (code === 'KeyS') {
      saveGame(this.props.saveData)
      this.msg = '存储成功'
    } else if (code === 'KeyL') {
      this.props.onLoadMap(loadGame())
    } else if (code === 'KeyX') {
      this.showEnemyInfo = !this.showEnemyInfo
    } else if (code === 'KeyB') {
      this.buying = true
    } else if (code === 'PageUp') {
      console.log(this.props)
    } else if (code === 'PageUp') {
      console.log(this.props)
    }
    if (moveVector) {
      const vector = updateVector(styleHero, moveVector)

      const terrain = this.isCoincidedTerrains(vector)
      if (terrain !== -1) {
        return
      }

      const eventIndex = this.isCoincidedEvents(vector)
      if (eventIndex !== -1) {
        if (this.handleEvents(this.props.map.mapEvents[eventIndex])) {
          assignVector(styleHero, vector)
        }
        return
      }

      assignVector(styleHero, vector)
    }
  }

  onShopClose = () => {
    this.shopid = null
    this.setEvent()
  };

  handleEvents (mapEvent) {
    if (this.mapEvent) {
      debugger
      return
    }

    if (mapEvent[3]) {
      this.mapEvent = mapEvent
      this.eventIndex = 0
      this.setEvent()
    } else {
      const info = window.$res.mapping[mapEvent[2]]
      const { name, type } = info
      if (type === 'items') {
        const item = window.$res.items[name]
        const { type } = item
        if (type === '1') {
          this.remove(mapEvent)
          this.updateSaveData('items', name)
          this.msg = `获得${item.name}`
        } else if (type === '2') {
          this.remove(mapEvent)
          this.updateSaveData(...item.property)
          const [name, property] = item.property
          this.msg = `获得${item.name}`
          property.forEach((property) => {
            const [key, value] = property
            let propertyName = key
            if (name === 'hero') {
              propertyName = propertyNames[key]
            } else if (name === 'items') {
              propertyName = window.$res.items[key].name
            } else if (key === 'money') {
              propertyName = '金币'
            }
            this.msg += ` ${propertyName}${value > 0 ? '+' : '-'}${value}`
          })
        }
        return true
      } else if (type === 'enemys') {
        mapEvent[3] = [
          {
            type: 'enemy',
            data: name,
          },
        ]
        this.handleEvents(mapEvent)
        return false
      } else if (type === 'terrains') {
        if (
          [
            'yellowDoor',
            'redDoor',
            'blueDoor',
            'steelDoor',
            'specialDoor',
          ].includes(name)
        ) {
          const key = name.slice(0, -4) + 'Key'
          if (this.props.saveData.items[key]) {
            this.props.saveData.items[key]--
            this.remove(mapEvent)
            return true
          }
        }
      }
    }
  }

  setEvent = () => {
    if (this.eventIndex < this.mapEvent[3].length) {
      const event = this.mapEvent[3][this.eventIndex++]
      const { type, data } = event
      if (type === 'talk') {
        this.talk = data
        return
      } else if (type === 'mapLoad') {
        this.props.onLoadMap(data)
      } else if (type === 'openShop') {
        this.shopid = event.id
        this.props.saveData.shops = this.props.saveData.shops || {}
        this.props.saveData.shops[this.shopid] =
          window.$res.shop[this.shopid].title
        return
      } else if (type === 'getItems') {
        this.updateSaveData('items', data)
      } else if (type === 'removeSelf') {
        this.remove(this.mapEvent)
        return
      } else if (type === 'moveBlock') {
        console.log(this.mapEvent)
        this.remove(this.mapEvent)
        return
      } else if (type === 'enemy') {
        const enemy = window.$res.enemys[data]
        const hero = this.props.saveData.hero
        if (hero.atk > enemy.def) {
          if (
            hero.def >= enemy.atk ||
            enemy.hp / (hero.atk - enemy.def) <=
              hero.hp / (enemy.atk - hero.def)
          ) {
            this.enemy = enemy
            return
          } else {
            this.mapEvent = null
            this.eventIndex = 0
            this.msg = `你打不过${enemy.name}`
            return
          }
        } else {
          this.mapEvent = null
          this.eventIndex = 0
          this.msg = `你的攻击比${enemy.name}的防御低`
          return
        }
      } else if (type === 'updateSaveData') {
        this.updateSaveData(...convertPropertyStr(data))
      } else if (type === 'removeBlock') {
        this.props.removeMapEvent(data)
      } else if (type === 'title') {
        this.props.onTitle()
      } else if (type === 'removeMapBlock') {
        const { mapId, position } = data
        const { x, y } = position
        this.props.saveData.destroy[[mapId, x, y]] = true
      } else if (type === 'if') {
        const { condition, true: trueEvent, false: falseEvent } = event
        this.mapEvent = null
        this.eventIndex = 0
        if (this.checkSaveData(...convertPropertyStr(condition))) {
          this.mapEvent = [0, 0, 0, trueEvent]
        } else {
          this.mapEvent = [0, 0, 0, falseEvent]
        }
      } else {
        console.error(event)
      }
      this.setEvent()
    } else {
      this.mapEvent = null
    }
  };

  remove (mapEvent) {
    this.props.removeMapEvent(mapEvent)
    this.mapEvent = null
  }

  onBattleClose = () => {
    this.enemy = null
    this.props.removeMapEvent(this.mapEvent)
    this.setEvent()
  };

  onConfirm = () => {
    this.talk = null
    this.setEvent()
  };

  onMenuClose = () => {
    this.showMenu = null
  };

  onMessageClose = () => {
    this.msg = null
  };

  updateSaveData (context, gets, n = 1) {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => this.updateSaveData(context, id, value))
    } else if (typeof gets === 'string') {
      const saveData = context
        ? this.props.saveData[context]
        : this.props.saveData
      saveData[gets] = saveData[gets] || 0
      saveData[gets] += Number(n)
    } else if (typeof gets === 'object') {
      this.updateSaveData(context, Object.entries(gets))
    } else {
      console.error(gets, n)
    }
  }

  checkSaveData (context, gets, n = 1) {
    if (Array.isArray(gets)) {
      return gets.some(([id, value]) => this.checkSaveData(context, id, value))
    } else if (typeof gets === 'string') {
      const saveData = context
        ? this.props.saveData[context]
        : this.props.saveData
      saveData[gets] = saveData[gets] || 0
      return saveData[gets] + Number(n) >= 0
    } else if (typeof gets === 'object') {
      return this.checkSaveData(context, Object.entries(gets), null, 0)
    } else {
      return false
    }
  }

  onShopEvent = (need, effect) => {
    if (this.checkSaveData(...convertPropertyStr(need))) {
      this.updateSaveData(...convertPropertyStr(need))
      this.updateSaveData(...convertPropertyStr(effect))
    }
  };

  onShopListClose = () => {
    this.buying = false
  };

  onShopListConfirm = (shopid) => {
    this.buying = false
    this.shopid = shopid
    this.mapEvent = [0, 0, 0, []]
  };

  render () {
    return (
      <div>
        <img style={this.styles.hero} src="Characters/hero.png"></img>
        {this.buying && (
          <ShopList
            saveData={this.props.saveData}
            onClose={this.onShopListClose}
            onConfirm={this.onShopListConfirm}
          />
        )}
        {this.shopid && (
          <Shop
            shopid={this.shopid}
            saveData={this.props.saveData}
            onClose={this.onShopClose}
            onShopEvent={this.onShopEvent}
          />
        )}
        {this.enemy && (
          <Battle
            enemy={this.enemy}
            enemyId={this.enemyId}
            hero={this.props.saveData.hero}
            saveData={this.props.saveData}
            onClose={this.onBattleClose}
          />
        )}
        {this.showMenu && (
          <Menu saveData={this.props.saveData} onClose={this.onMenuClose} />
        )}
        {this.talk && (
          <Talks talk={this.talk} key={this.talk} onConfirm={this.onConfirm} />
        )}
        {this.msg && (
          <Message
            msg={this.msg}
            key={this.msg}
            onMessageClose={this.onMessageClose}
          />
        )}
        {this.showEnemyInfo && (
          <EnemyInfo
            enemys={this.props.enemys}
            saveData={this.props.saveData}
            onClose={() => (this.showEnemyInfo = false)}
          />
        )}
      </div>
    )
  }
}
