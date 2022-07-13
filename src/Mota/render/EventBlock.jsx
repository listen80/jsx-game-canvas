import { Component, utils } from "Engine"

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

function run() {

}

export default class Event extends Component {
  onCreate() {
    this.data = transform(this.$state, this.props.value)
    this.event = this.props.event
  }
  runEvent(i = 0) {
    const e = this.event[i]
    if (!e) {
      return
    }
    const { data, type, next, condition, yes, no } = e
    if (type === 'if') {
      if (this.$hook('checkSaveByStr', condition)) {
        this.event = yes
        this.runEvent()
      } else {
        if (Array.isArray(no)) {
          this.event = no
          this.runEvent()
        } else {
          this.runEvent(i + 1)
        }
      }
      return
    }
    this.$hook(type, data, () => this.runEvent(i + 1))
  }
  onZhuangji() {
    const { type, enemy, name } = this.data
    if (this.props.event) {
      this.event = this.props.event
      this.runEvent()
      return
    }

    if (type === 'enemys') {
      this.event = [
        {
          type: 'battle',
          data: enemy,
        },
        {
          type: 'removeMapEventByKey',
          data: this.props.id
        }
      ]
      this.runEvent()
    } else if (type === "items") {
      const item = this.$state.items[name];
      const { type, property } = item;
      if (type === "normal" || type === "special") {
        this.event = [
          {
            type: 'setMessage',
            data: `获得${item.name}`
          },
          {
            type: 'getItem',
            data: name,
          },
          {
            type: 'removeMapEventByKey',
            data: this.props.id
          }
        ]
        this.runEvent()
      } else if (type === "update") {
        this.event = [
          {
            type: 'setSaveByStr',
            data: property,
          },
          {
            type: 'removeMapEventByKey',
            data: this.props.id
          }
        ]

        // const propertyNames = this.$state.config.propertyNames
        // const [name, property] = item.property;
        // let msg = `获得${item.name}`;
        // property.forEach((property) => {
        //   const [key, value] = property;
        //   let propertyName = key;
        //   if (name === "hero") {
        //     propertyName = propertyNames[key];
        //   } else if (name === "items") {
        //     propertyName = this.$state.items[key].name;
        //   } else if (key === "money") {
        //     propertyName = "金币";
        //   }
        //   msg += ` ${propertyName}${value > 0 ? "+" : "-"}${value}`;
        //   this.$hook('setMessage', msg);
        // });
        this.runEvent()
        
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
          this.$hook('removeMapEventByKey', this.props.id)
          this.$sound.play("se", "door.mp3");
          return true;
        }
        this.$hook('setMessage', `你没有${name}`);
      } else {

      }
    } else {
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
