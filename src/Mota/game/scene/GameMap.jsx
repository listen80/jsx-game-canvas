import StatusBar from "../helper/StatusBar";
import OperationBar from "../helper/OperationBar";
// import Hero from "../char/Hero";
// import EventBlock from "../event/EventBlock";

export default {
  createWall() {
    this.walls = [];
    for (let x = 0; x < this.$config.screen.width; x++) {
      for (let y = 0; y < 13; y++) {
        if (
          x === 0 ||
          x === this.$config.screen.width - 1 ||
          y === 0 ||
          y === this.$config.screen.height - 1
        ) {
          this.walls.push(<div image="terrains" style={{ sy: 2, x, y }}></div>);
        }
      }
    }
  },

  onCreate() {
    this.position = {
      x: this.$config.screen.width / 2,
      y: 8,
    };
    this.attrs = {
      wrap: {
        backgroundImage: "Background/ground.png",
        size: {
          width: this.$config.screen.width,
          height: 13,
        },
      },
      mapContainer: {
        position: { x: 5 },
        size: {
          width: 13,
          height: 13,
        },
      },
      statusBar: { position: { x: 18 } },
      operationBar: { position: { x: 1 } },
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
    // this.mapBgm.pause();
  },

  onClick(attrs, e) {
    const { gameX: x, gameY: y } = e;
    console.log(e);
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
    return null;
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

  renderBlueWall() {
    return (
      <div>
        <div
          size={{ width: this.$config.screen.width }}
          backgroundImage="Background/blueWall.png"
        ></div>
        <div
          position={{ y: this.$config.screen.height - 1 }}
          size={{ width: this.$config.screen.width }}
          backgroundImage="Background/blueWall.png"
        ></div>
        <div
          position={{ y: 1 }}
          size={{ height: 13 }}
          backgroundImage="Background/blueWall.png"
        ></div>
        <div
          position={{ x: this.$config.screen.width - 1, y: 1 }}
          size={{ height: 13 }}
          backgroundImage="Background/blueWall.png"
        ></div>
      </div>
    );
  },

  render() {
    const { attrs } = this;

    return (
      <div {...attrs.wrap}>
        {this.renderBlueWall()}
        <div {...attrs.mapContainer} onClick={this.onClick}>
          {/* {this.renderMapTerrains()} */}
          {/* <Hero map={this.map} terrains={this.terrains} /> */}
        </div>
        <div {...attrs.statusBar}>
          <StatusBar />
        </div>
        <div {...attrs.operationBar}>
          <OperationBar />
        </div>
        {this.walls}
      </div>
    );
  },
};
