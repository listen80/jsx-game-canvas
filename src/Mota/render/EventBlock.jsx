import { Component } from "Engine"

function transform($state, value, x, y) {
  const info = $state.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  let maxTick = 1
  const data = {
    src: type,
    sy: detail.sy,
    type,
    name,
    // ...info,
    // x: x,
    // y: y,
    maxInterval: 10,
  }
  if (type === "animates") {
    maxTick = 4
  } else if (type === "terrains" || type === "items") {
    maxTick = 1
  } else if (type === "npcs" || type === "enemys") {
    maxTick = 2
  }
  if (type === "enemys") {
    const enemy = $state.enemys[name]
    data.enemy = enemy
    maxTick = 2
  }
  data.maxTick = maxTick
  return data
}

export default class Event extends Component {
  onCreate() {
    this.data = transform(this.$state, this.props.value)
    this.event = this.props.event
  }
  runEvent(i = 0) {
    const { data, key, next, condition } = this.props.event[i]
    if (key === 'if') {
      console.log(condition)
    }
    this.$hook({
      ...this.props.event[i],
      next: () => this.runEvent(i + 1)
    })
  }
  onZhuangji() {
    const { type, enemy, name } = this.data
    if (this.props.event) {
      this.runEvent()
      return
    }

    const propertyNames = this.$state.config.propertyNames

    if (type === 'enemys') {
      this.$hook('battle', enemy, () => {
        this.$hook('removeMapEvent', this)
      })
    } else if (type === "items") {
      const item = this.$state.items[name];
      const { type } = item;
      if (type === "1" || type === "3") {
        // this.remove(mapEvent);
        this.$hook("getItems", name);
        this.$hook('setMessage', `获得${item.name}`);
        this.$sound.play("se", type === "1" ? "item.mp3" : "constants.mp3");
        this.$hook('removeMapEvent', this)
      } else if (type === "2") {
        // this.remove(mapEvent);
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
          this.$hook('setMessage', msg);
        });
        this.$hook('removeMapEvent', this)
        this.$sound.play("se", "item.mp3");
      }
      return true;
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
          this.$hook('removeMapEvent', this)
          this.$sound.play("se", "door.mp3");
          return true;
        }
      } else {
        this.$hook('setMessage', `你没有${name}`);

        // debugger

      }
    } else {
      debugger
    }
  }
  onMouseDown() {
    const { type, enemy, name } = this.data

    this.props.onClick(this)
    return true
  }

  render() {
    const { x, y } = this.props;
    return (
      <div style={{ width: 1, height: 1, x, y }} onMouseDown={this.onMouseDown}>
        <animate {...this.data}></animate>
        {this.enemy}
      </div>
    );
  }
}
