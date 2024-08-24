import Animate from "@/components/Base/Animate";

function transform($loader, value) {
  const mapInfo = $loader.$resource.mapping[value];
  const { type, name } = mapInfo;
  const spritesInfo = $loader.$resource.sprites[type][name];

  const typeToMaxTick = {
    animates: 4,
    terrains: 1,
    items: 1,
    npcs: 2,
    enemy: 2,
  };
  const maxTick = typeToMaxTick[type];

  const data = {
    image: type,
    sy: spritesInfo.sy,
    type,
    name,
    maxInterval: 10,
    maxTick,
  };

  return data;
}

export default {
  name: "EventBlock",
  onCreate() {
    this.data = transform(this.$state, this.$loader, this.props.value);
    this.event = this.props.event;
  },

  runEvent(i = 0) {
    const e = this.event[i];
    if (!e) {
      return;
    }
    const { data, type, next, condition, yes, no } = e;
    if (type === "if") {
      if (this.$event.emit("checkSaveByStr", condition)) {
        this.event = yes;
        this.runEvent();
      } else {
        if (Array.isArray(no)) {
          this.event = no;
          this.runEvent();
        } else {
          this.runEvent(i + 1);
        }
      }
    } else if (type === "removeSelf") {
      this.$event.emit("removeMapEventByKey", this.props.id, () =>
        this.runEvent(i + 1)
      );
    } else {
      this.$event.emit(type, data, () => this.runEvent(i + 1));
    }
  },

  onZhuangji() {
    const { type, enemy, name } = this.data;
    if (this.props.event) {
      this.event = this.props.event;
      this.runEvent();
      return;
    }

    if (type === "enemys") {
      this.event = [
        {
          type: "battle",
          data: enemy,
        },
        {
          type: "removeMapEventByKey",
          data: this.props.id,
        },
      ];
      this.runEvent();
    } else if (type === "items") {
      const item = this.$state.items[name];
      const { type, property } = item;
      if (type === "normal" || type === "special") {
        this.event = [
          {
            type: "message",
            data: `获得${item.name}`,
          },
          {
            type: "getItem",
            data: name,
          },
          {
            type: "removeMapEventByKey",
            data: this.props.id,
          },
        ];
        this.runEvent();
      } else if (type === "update") {
        this.event = [
          {
            type: "setSaveByStr",
            data: property,
          },
          {
            type: "removeMapEventByKey",
            data: this.props.id,
          },
        ];
        // "propertyNames": {
        //   "hero": "勇士",
        //   "lv": "等级",
        //   "money": "金币",
        //   "hp": "生命",
        //   "atk": "攻击",
        //   "def": "防御",
        //   "exp": "经验"
        // }
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
        //   this.$event.emit('message', msg);
        // });
        this.runEvent();

        this.$sound.play("se", "item.mp3");
      }
      return true;
    } else if (type === "terrains") {
      const terrains = ["yellowDoor", "redDoor", "blueDoor"];
      if (terrains.includes(name)) {
        const key = name.slice(0, -4) + "Key";
        if (this.$state.save.items[key]) {
          this.$state.save.items[key]--;
          this.$event.emit("removeMapEventByKey", this.props.id);
          this.$sound.play("se", "door.mp3");
          return true;
        }
        const i18n = ["黄色钥匙", "红色钥匙", "蓝色钥匙"];

        this.$event.emit("message", `你没有${i18n[terrains.indexOf(name)]}`);
      }
    }
  },

  onClick() {
    const { type, enemy, name } = this.data;
    this.props?.onClick(this);
    return true;
  },

  render() {
    const { x, y } = this.props;
    const size = { height: 1, width: 1 };
    return (
      <view
        position={{ x, y }}
        style={{ width: 1, height: 1, x, y }}
        onClick={this.onClick}
      >
        {/* <Animate {...this.data}></Animate> */}
        <view
          size={size}
          image={this.data.image}
          sposition={{ sy: this.data.sy }}
        ></view>

        {this.enemy}
      </view>
    );
  },
};
