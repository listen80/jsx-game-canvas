import { Component } from "Engine";

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
    const enemy = mota.$node.$context.$state.enemys[name]
    data.enemy = enemy
    maxTick = 2
  }
  data.maxTick = maxTick
  return data
}

export default class Event extends Component {
  onCreate() {
    this.data = transform(this.$state, this.props.value)
  }
  onMouseDown() {
    const { type, enemy, name } = this.data
    if (type === 'enemys') {
      this.$state.enemy = enemy
    } else if (type === "items") {
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
    }
  }

  render() {

    return (
      <div style={{ width: 1, height: 1, x: this.props.x, y: this.props.y }} onMouseDown={this.onMouseDown}>
        <animate {...this.data}></animate>
        {this.enemy}
      </div>
    );
  }
}
