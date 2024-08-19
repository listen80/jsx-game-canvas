import EventBlock from "../../../event/EventBlock";
import Hero from "../../../event/Hero";

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
    this.mapJSON = this.$resource.maps[mapId];
    this.mapsDestroyTerrains = this.$state.save.mapsDestroyTerrains;

    // const bgm = this.$state.map.bgm;

    // this.mapBgm = this.$sound.play("bgm", bgm);
    // this.map = this.createMap();
    // this.createWall();
    // this.$event.emit("message", this.$state.map.name);
    this.mapTerrainsData = this.getMapTerrainsData();
  },

  getKey(mapId, x, y) {
    return String([mapId, x, y]);
  },
  ff({ position }) {
    const { mapId } = this.$state;
    const { x, y } = position;
    const key = this.getKey(mapId, x, y);
    this.mapsDestroyTerrains[key] = true;
    this.mapTerrainsData[y][x] = null;
  },
  getMapTerrainsData() {
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

        /* {
          image: "animates";
          maxInterval: 10;
          maxTick: 4;
          name: "star";
          sy: 0;
          type: "animates";
        } */
        const data = transform(this.$loader, mapIndexValue);
        // console.log(transform(this.$loader, mapIndexValue))

        const props = {
          image: data.image,
          position: { x, y },
          sposition: { sx: 0, sy: data.sy },
          size: { width: 1, height: 1 },
          bgColor: "red",
          onClick: this.ff,
        };
        return props;
        return (
          <view
            image={data.image}
            position={{ x, y }}
            sposition={{ sx: 0, sy: data.sy }}
            size={{ width: 1, height: 1 }}
            bgColor={"red"}
            onClick={this.ff}
          ></view>
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
    return map;
  },

  onDestroy() {
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

  renderMapTerrains() {
    // console.log(this.mapTerrainsData)
    return this.mapTerrainsData.map((row, y) =>
      row.map((props) => (props ? <view {...props} /> : null))
    );
  },

  render() {
    return (
      <view {...this.mapContainerProps} onClick={this.onClickx}>
        {this.renderMapTerrains()}
        <Hero />
      </view>
    );
  },
};
