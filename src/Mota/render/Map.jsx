import { Component, Animate } from "Engine";
import Hero from "./Hero";
import Status from "./Status";

export default class Map extends Component {
  tick = 0;
  interval = 10;
  styles = {
    map: {
      width: 13,
      height: 13,
      backgroundImage: "ground.png",
    },
    statusBar: {
      x: 13,
      width: 5,
      height: 13,
      backgroundImage: "ground.png",
    },
  };

  create() {
    // const bgm = this.props.map.bgm;
    // this.mapBgm = this.$sound.play('bgm', bgm)
  }

  destroy() {
    // const bgm = this.props.map.bgm;
    // this.$sound.pause('bgm', bgm)
    // this.mapBgm.pause();
  }

  renderMapTerrains() {
    const { mapTerrains } = this.$state.map;
    const tick = this.tick;
    if (!mapTerrains) {
      return;
    }
    let sx = 0;
    return mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value) {
          const info = this.$state.mapping[value];
          const { type, name } = info;
          const detail = this.$state[type][name];

          if (type === "animates") {
            sx = tick % 4;
            const style = {
              sy: detail.sy,
              sx,
              x: x,
              y: y,
              height: 1,
              width: 1,
            };
            return <img src={type} style={style} />;
          } else if (type === "terrains") {
            const style = {
              sy: detail.sy,
              sx: 0,
              x: x,
              y: y,
              height: 1,
              width: 1,
            };
            return <img src={type} style={style} />;
          } else {
            return null;
          }
        } else {
          return null;
        }
      });
    });
  }

  renderMapEvents() {
    const { mapId, destroy = {} } = this.$state.save;
    const { mapEvents } = this.$state.map;
    return (
      mapEvents &&
      mapEvents.map((event) => {
        const [x, y, value, events] = event;
        if (destroy[[mapId, x, y]]) {
          return null;
        }
        if (value) {
          const info = this.$state.mapping[value];
          if (info) {
            const { type, name } = info;
            const detail = this.$state[type][name];
            // terrains items icons npcs enemys
            if (type === "npcs" || type === "enemys") {
              return (
                <Animate
                  data={{
                    src: type,
                    x: x,
                    y: y,
                    sy: detail.sy,
                    maxTick: 2,
                  }}
                ></Animate>
              );
            }
            return (
              <Animate
                data={{
                  src: type,
                  x: x,
                  y: y,
                  sy: detail.sy,
                  maxTick: 1,
                }}
              ></Animate>
            );
          }
        }
        return null;
      })
    );
  }

  onRemoveMapEvent = (mapEvent) => {
    const [x, y] = mapEvent;
    const mapId = this.$state.save.mapId;
    this.$state.save.destroy = this.$state.save.destroy || {};
    this.$state.save.destroy[[mapId, x, y]] = 1;
  };

  onTitle = () => {
    this.props.onTitle();
  };

  onMouseDown = (e) => {
    // DFS BFS
    const position = this.$state.save.position;
    const { x, y } = position;
    // this.$state.map(() => {});
    const { gameX, gameY } = e;
    this.$state.save.position.x = gameX;
    this.$state.save.position.y = gameY;
  };

  render() {
    this.interval--;
    if (this.interval === 0) {
      this.tick++;
      this.interval = 10;
    }
    const mapTerrains = this.renderMapTerrains();
    const mapEvents = this.renderMapEvents();
    return (
      <div>
        <div style={this.styles.map} onMouseDown={this.onMouseDown}>
          {mapTerrains}
          {mapEvents}
        </div>
        <div style={this.styles.statusBar}>
          <Status />
        </div>
        <Hero
          mapTerrains={mapTerrains}
          mapEvents={mapEvents}
          map={this.props.map}
          onLoadMap={this.props.onLoadMap}
          onMessage={this.props.onMessage}
          removeMapEvent={this.onRemoveMapEvent}
          onTitle={this.onTitle}
        />
      </div>
    );
  }
}
