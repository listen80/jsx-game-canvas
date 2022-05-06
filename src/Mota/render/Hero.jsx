import { Component } from "Engine";

import Shop from "./Shop";
import Battle from "./Battle";
import Talks from "./Talks";
import EnemyInfo from "./EnemyInfo";
import ShopList from "./ShopList";
import Animate from "../../Engine/components/Animate";

import { saveGame, loadGame } from "../../Engine/utils/sl";
import {
  isCoincided,
  updateVector,
  assignVector,
} from "../../Engine/utils/physics";

import { convertPropertyStr } from "../../Engine/utils/format";

const propertyNames = {
  lv: "等级",
  money: "金币",
  hp: "生命",
  atk: "攻击",
  def: "防御",
  exp: "经验",
};

const size = 32;

class FourFace extends Component {
  render() {
    return (
      <Animate
        data={{
          src: "Characters/hero.png",
          width: size,
          height: size,
          maxTick: 4,
          maxInterval: 10,
          sy: this.save.sy,
        }}
      />
    );
  }
  onKeyDown({ $key }) {
    let moveVector = null;
    if ($key === "down") {
      moveVector = { x: 0, y: step };
      this.save.sy = 0;
    } else if ($key === "up") {
      moveVector = { x: 0, y: -step };
      this.save.sy = 3;
    } else if ($key === "left") {
      moveVector = { x: -step, y: 0 };
      this.save.sy = 1;
    } else if ($key === "right") {
      moveVector = { x: step, y: 0 };
      this.save.sy = 2;
    } else {
      this.props.onKeyDown({ $key });
    }
  }
}

export default class Hero extends Component {
  tick = 0;
  create() {

  }

  isCoincidedTerrains(heroStyle) {
    return this.props.mapTerrains.findIndex(
      (item) => item && item && isCoincided(item.props.style, heroStyle)
    );
  }

  isCoincidedEvents(heroStyle) {
    return this.props.mapEvents.findIndex(
      (item) => item && item && isCoincided(item.props.style, heroStyle)
    );
  }

  onKeyDown({ code, $key }) {
    const postion = this.$state.save.position;
    const step = 32;
    let moveVector = null;
    if ($key === "down") {
      moveVector = { y: step };
      postion.sy = 0;
      // this.$sound.play('se', 'step.mp3')
    } else if ($key === "up") {
      moveVector = { y: -step };
      postion.sy = 3;
      // this.$sound.play('se', 'step.mp3')
  } else if ($key === "left") {
      moveVector = { x: -step };
      postion.sy = 1;
      // this.$sound.play('se', 'step.mp3')
    } else if ($key === "right") {
      moveVector = { x: step };
      postion.sy = 2;
      // this.$sound.play('se', 'step.mp3')
    } else if (code === "KeyS") {
      saveGame(this.$state.save);
      this.$sound.play("se", "load.mp3");
      this.setMessage("存储成功");
    } else if (code === "KeyL") {
      this.$sound.play("se", "load.mp3");
      this.props.onLoadMap(loadGame());
      this.setMessage("读取成功");
    } else if (code === "KeyX") {
      this.showEnemyInfo = !this.showEnemyInfo;
    } else if (code === "KeyB") {
      this.buying = true;
    } else if (code === "Backspace") {
      this.updateSaveData("hero", {
        lv: 1,
        hp: 100,
        atk: 100,
        def: 100,
        exp: 100,
      });
      this.updateSaveData("items", { yellowKey: 3, blueKey: 2, redKey: 1 });
      this.updateSaveData("", { money: 100 });
    }

    if (moveVector) {
      const vector = updateVector(postion, moveVector);

      const terrain = this.isCoincidedTerrains(vector);
      if (terrain !== -1) {
        return;
      }

      const eventIndex = this.isCoincidedEvents(vector);
      if (eventIndex !== -1) {
        if (this.handleEvents(this.props.map.mapEvents[eventIndex])) {
          assignVector(postion, vector);
        }
        return;
      }

      assignVector(postion, vector);
    }
  }

  onShopClose = () => {
    this.shopid = null;
    this.setEvent();
  };

  handleEvents(mapEvent) {
    if (this.mapEvent) {
      return;
    }

    if (mapEvent[3]) {
      this.mapEvent = mapEvent;
      this.eventIndex = 0;
      this.setEvent();
    } else {
      const info = this.$state.mapping[mapEvent[2]];
      const { name, type } = info;
      if (type === "items") {
        const item = this.$state.items[name];
        const { type } = item;
        if (type === "1" || type === "3") {
          this.remove(mapEvent);
          this.updateSaveData("items", name);
          this.setMessage(`获得${item.name}`);
          this.$sound.play("se", type === "1" ? "item.mp3" : "constants.mp3");
        } else if (type === "2") {
          this.remove(mapEvent);
          this.updateSaveData(...item.property);
          const [name, property] = item.property;
          let msg = `获得${item.name}`;
          property.forEach((property) => {
            const [key, value] = property;
            let propertyName = key;
            if (name === "hero") {
              propertyName = propertyNames[key];
            } else if (name === "items") {
              propertyName = this.$state.items[key].name;
            } else if (key === "money") {
              propertyName = "金币";
            }
            msg += ` ${propertyName}${value > 0 ? "+" : "-"}${value}`;
            this.setMessage(msg);
          });
          this.$sound.play("se", "item.mp3");
        }
        return true;
      } else if (type === "enemys") {
        mapEvent[3] = [
          {
            type: "enemy",
            data: name,
          },
        ];
        this.handleEvents(mapEvent);
        return false;
      } else if (type === "terrains") {
        if (
          [
            "yellowDoor",
            "redDoor",
            "blueDoor",
            "steelDoor",
            "specialDoor",
          ].includes(name)
        ) {
          const key = name.slice(0, -4) + "Key";
          if (this.$state.save.items[key]) {
            this.$state.save.items[key]--;
            this.remove(mapEvent);
            this.$sound.play("se", "door.mp3");
            return true;
          }
        }
      }
    }
  }

  setEvent = () => {
    if (this.eventIndex < this.mapEvent[3].length) {
      const event = this.mapEvent[3][this.eventIndex++];
      const { type, data } = event;
      if (type === "talk") {
        this.talk = data;
        return;
      } else if (type === "mapLoad") {
        // this.props.onLoadMap(data);
      } else if (type === "openShop") {
        this.shopid = event.id;
        this.$state.save.shops = this.$state.save.shops || {};
        this.$state.save.shops[this.shopid] = this.$state.shop[this.shopid].title;
        return;
      } else if (type === "getItems") {
        this.updateSaveData("items", data);
      } else if (type === "removeSelf") {
        this.remove(this.mapEvent);
        return;
      } else if (type === "moveBlock") {
        this.remove(this.mapEvent);
        return;
      } else if (type === "enemy") {
        const enemy = this.$state.enemys[data];
        const hero = this.$state.save.hero;
        if (hero.atk > enemy.def) {
          if (
            hero.def >= enemy.atk ||
            enemy.hp / (hero.atk - enemy.def) <=
              hero.hp / (enemy.atk - hero.def)
          ) {
            this.enemy = enemy;
            return;
          } else {
            this.mapEvent = null;
            this.eventIndex = 0;
            this.setMessage(`你打不过${enemy.name}`);
            return;
          }
        } else {
          this.mapEvent = null;
          this.eventIndex = 0;
          this.setMessage(`你的攻击比${enemy.name}的防御低`);
          return;
        }
      } else if (type === "updateSaveData") {
        this.updateSaveData(...convertPropertyStr(data));
      } else if (type === "removeBlock") {
        this.props.removeMapEvent(data);
      } else if (type === "title") {
        this.props.onTitle();
      } else if (type === "removeMapBlock") {
        const { mapId, position } = data;
        const { x, y } = position;
        this.$state.save.destroy[[mapId, x, y]] = true;
      } else if (type === "if") {
        const { condition, true: trueEvent, false: falseEvent } = event;
        this.mapEvent = null;
        this.eventIndex = 0;
        if (this.checkSaveData(...convertPropertyStr(condition))) {
          this.mapEvent = [0, 0, 0, trueEvent];
        } else {
          this.mapEvent = [0, 0, 0, falseEvent];
        }
      } else {
        // console.error(event)
      }
      this.setEvent();
    } else {
      this.mapEvent = null;
    }
  };

  remove(mapEvent) {
    this.props.removeMapEvent(mapEvent);
    this.mapEvent = null;
  }

  onBattleClose = () => {
    this.enemy = null;
    this.props.removeMapEvent(this.mapEvent);
    this.setEvent();
  };

  onConfirm = () => {
    this.talk = null;
    this.setEvent();
  };

  setMessage = (msg) => {
    this.props.onMessage(msg);
  };

  updateSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => this.updateSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? this.$state.save[context] : this.$state.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === "object") {
      this.updateSaveData(context, Object.entries(gets));
    } else {
      // console.error(gets, n)
    }
  }

  checkSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      return gets.some(([id, value]) => this.checkSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? this.$state.save[context] : this.$state.save;
      saveData[gets] = saveData[gets] || 0;
      return saveData[gets] + Number(n) >= 0;
    } else if (typeof gets === "object") {
      return this.checkSaveData(context, Object.entries(gets), null, 0);
    } else {
      return false;
    }
  }

  onShopEvent = (need, effect) => {
    if (this.checkSaveData(...convertPropertyStr(need))) {
      this.updateSaveData(...convertPropertyStr(need));
      this.updateSaveData(...convertPropertyStr(effect));
    }
  };

  onShopListClose = () => {
    this.buying = false;
  };

  onShopListConfirm = (shopid) => {
    this.buying = false;
    this.shopid = shopid;
    this.mapEvent = [0, 0, 0, []];
  };

  render() {
    return (
      <div>
        <div style={this.$state.save.position}>
          <Animate
            data={{
              src: "Characters/hero.png",
              width: size,
              height: size,
              maxTick: 4,
              maxInterval: 10,
              sy: this.$state.save.position.sy,
            }}
          ></Animate>
        </div>
        {this.buying && (
          <ShopList
            onClose={this.onShopListClose}
            onConfirm={this.onShopListConfirm}
          />
        )}
        {this.shopid && (
          <Shop
            shopid={this.shopid}
            onClose={this.onShopClose}
            onShopEvent={this.onShopEvent}
          />
        )}
        {this.enemy && (
          <Battle
            enemy={this.enemy}
            enemyId={this.enemyId}
            hero={this.$state.save.hero}
            onClose={this.onBattleClose}
          />
        )}
        {this.talk && (
          <Talks talk={this.talk} key={this.talk} onConfirm={this.onConfirm} />
        )}
        {this.showEnemyInfo && (
          <EnemyInfo
            enemys={this.props.enemys}
            onClose={() => (this.showEnemyInfo = false)}
          />
        )}
      </div>
    );
  }
}
