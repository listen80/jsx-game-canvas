import EventBlock from "../../../event/EventBlock";
export default {
  name: "Map",
  onCreate() {
    this.attrs = {
      mapContainerProps: {
        position: { x: 5 },
        size: {
          width: 13,
          height: 13,
        },
      },
    };

    const bgm = this.$state.map.bgm;
    this.mapBgm = this.$sound.play("bgm", bgm);
    this.map = this.createMap();
    // this.createWall();
    this.$event.emit("message", this.$state.map.name);
  },

  getKey(x, y) {
    const mapId = this.$state.save.mapId;
    const key = [mapId, x, y] + "";
    return key;
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

    this.$state.map.mapEvents.forEach((element) => {
      const { x, y, value, events } = element;
      map[y][x] = value;
      map[y + "," + x] = events;
    });
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
    console.log(this, block);
    const { x, y } = block.props;
    const { height, width } = this.$state.map;
    const { map } = this;
    this.$event.emit("setPath", {
      map: { height, width, map },
      dist: { x, y },
    });
  },

  renderMapTerrains() {
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
      <div {...this.attrs.mapContainerProps} onClick={this.onClick}>
        {this.renderMapTerrains()}
        {/* <Hero map={this.map} terrains={this.terrains} /> */}
      </div>
    );
  },
};
