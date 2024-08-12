import EventBlock from "../../../event/EventBlock";
import { transform } from "@/transform";
export default {
  name: "Floor",
  onCreate() {
    this.mapContainerProps = {
      position: { x: 5 },
      size: {
        width: 13,
        height: 13,
      },
    };
    const { mapId } = this.$state;
    this.mapJSON = this.$loader.$resource.maps[mapId];
    this.mapsDestroyTerrains = this.$state.save.mapsDestroyTerrains;

    // const bgm = this.$state.map.bgm;

    // this.mapBgm = this.$sound.play("bgm", bgm);
    // this.map = this.createMap();
    // this.createWall();
    // this.$event.emit("message", this.$state.map.name);
  },

  getKey(mapId, x, y) {
    return String([mapId, x, y]);
  },
  ff({ position }) {
    const { mapId } = this.$state;
    const { x, y } = position;
    const key = this.getKey(mapId, x, y);

    this.mapsDestroyTerrains[key] = true;
  },
  renderMapTerrains() {
    const { mapId } = this.$state;
    // 障碍物 不可以穿过
    // 物品 不可以穿过 可以捡取
    // 怪物 不可以穿过 可以攻击
    // NPC 不可以穿过 可以事件
    return this.mapJSON.mapTerrains.map((row, y) => {
      return row.map((mapIndexValue, x) => {
        // 地图上就是空
        if (mapIndexValue === 0) {
          return null;
        }
        //
        const key = this.getKey(mapId, x, y);
        if (this.mapsDestroyTerrains[key]) {
          return null;
        }

        /*       {
          image: "animates";
          maxInterval: 10;
          maxTick: 4;
          name: "star";
          sy: 0;
          type: "animates";
        } */
        const props = transform(this.$loader, mapIndexValue);
        // console.log(transform(this.$loader, mapIndexValue))
        return (
          <div
            image={props.image}
            position={{ x, y }}
            sposition={{ sx: 0, sy: props.sy }}
            size={{ width: 1, height: 1 }}
            bgColor={"red"}
            onClick={this.ff}
          ></div>
        );
        // return <EventBlock value={mapIndexValue} x={x} y={y} />;
      });
    });
  },
  createMap() {
    const map = this.$state.map.mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value && !this.$state.save.destroy[this.getKey(x, y)]) {
          return value;
        } else {
          return null;
        }
      });
    });

    // this.$state.map.mapEvents.forEach((element) => {
    //   const { x, y, value, events } = element;
    //   map[y][x] = value;
    //   map[y + "," + x] = events;
    //   console.log(y + "," + x, events)
    // });
    return map;
  },

  onDestroy() {
    // const bgm = this.props.map.bgm;
    // this.$sound.pause('bgm', bgm)
    this.mapBgm.pause();
  },

  onClick(props, e) {
    const { gameX: x, gameY: y } = e;
    const { height, width } = this.$state.map;
    const { map } = this;
    this.$event.emit("setPath", {
      map: { height, width, map },
      dist: { x, y },
    });
  },

  onEventClick(block) {
    const { x, y } = block.props;
    const { height, width } = this.$state.map;
    const { map } = this;
    this.$event.emit("setPath", {
      map: { height, width, map },
      dist: { x, y },
    });
  },

  renderMapTerrainsxx() {
    return this.map.map((line, y) =>
      line.map((value, x) =>
        value ? (
          <EventBlock
            value={value}
            x={x}
            y={y}
            id={this.getKey(x, y)}
            onClick={this.onEventClick}
            event={this.map[y + "," + x]}
          />
        ) : null
      )
    );
  },

  render() {
    return (
      <div {...this.mapContainerProps} onClick={this.onClickx}>
        {this.renderMapTerrains()}
        {/* <Hero map={this.map} terrains={this.terrains} /> */}
      </div>
    );
  },
};
