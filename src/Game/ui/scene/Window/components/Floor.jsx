import EventBlock from "@/ui/event/EventBlock";
import Hero from "@/ui/event/Hero";

import { transform } from "@/transform";

export default {
  name: "Floor",
  onCreate() {
    this.position = { x: 5, y: 0 };
    this.mapContainerProps = {
      position: this.position,
      size: {
        width: 13,
        height: 13,
      },
    };
    const { mapId } = this.$state;
    this.mapJSON = this.$resource.maps[mapId];

    this.mapsDestroyTerrains = this.$state.save.mapsDestroyTerrains;
    this.mapsDestroyEvents = this.$state.save.mapsDestroyEvents;

    const bgm = this.mapJSON;
    if (bgm) {
      this.mapBgm = this.$sound.play("bgm", bgm);
    }
    this.mapTerrainsData = this.getMapTerrainsDataX();
    this.mapEventsData = this.getMapEventsDataX();
  },

  onDestroy() {
    if (this.mapBgm) {
      this.mapBgm.pause();
    }
  },

  getKey(mapId, x, y) {
    return String([mapId, x, y]);
  },
  destoryTerrains({ props }) {
    const { position } = props;
    const { mapId } = this.$state;
    const { x, y } = position;
    const key = this.getKey(mapId, x, y);
    this.mapsDestroyTerrains[key] = true;
    this.mapTerrainsData[y][x] = null;
  },
  getMapTerrainsDataX() {
    const { mapId } = this.$state;
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

        return mapIndexValue;
      });
    });
  },

  getMapEventsDataX() {
    return this.mapJSON.mapEvents.slice();
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
    return this.mapTerrainsData.map((row) =>
      row.map((props) => (props ? <view {...props} /> : null))
    );
  },

  onClickx(e) {
    const gameX = e.gameX;
    const gameY = e.gameY;
    this.$state.save.position.x = gameX - this.position.x;
    this.$state.save.position.y = gameY - this.position.y;
  },

  onkeydown(e) {
    console.log(e);
  },
  render() {
    return (
      <view {...this.mapContainerProps} onClick={this.onClickx}>
        {this.mapTerrainsData.map((row, y) => {
          return row.map((value, x) => {
            return value ? <EventBlock value={value} x={x} y={y} /> : null;
          });
        })}
        {this.mapEventsData.map((item) => {
          return <EventBlock {...item} />;
        })}
        <Hero />
      </view>
    );
  },
};
