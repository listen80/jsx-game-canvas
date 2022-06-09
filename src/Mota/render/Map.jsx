import { Component, Animate } from "Engine";
import Hero from "./Hero";
import Status from "./Status";

export default class Map extends Component {
  styles = {
    map: {
      width: 13,
      height: 13,
      x: 0,
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

  onClick() {
    console.log(this)
  }

  renderMapTerrains() {
    const { mapTerrains } = this.$state.map;
    if (!mapTerrains) {
      return;
    }
    return mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value) {
          const info = this.$state.mapping[value];
          const { type, name } = info;
          const detail = this.$state[type][name];
          if (type === "animates") {
            return <Animate
              data={{
                src: type,
                sy: detail.sy,
                x: x,
                y: y,
                maxTick: 4,
              }}></Animate>
          } else if (type === "terrains" || type === "items") {
            return <Animate
              data={{
                src: type,
                sy: detail.sy,
                x: x,
                y: y,
                maxTick: 1,
              }}></Animate>
          } else if (type === "npcs" || type === "enemys") {
            return <Animate
              data={{
                src: type,
                sy: detail.sy,
                x: x,
                y: y,
                maxTick: 2,
              }}></Animate>
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
                    sy: detail.sy,
                    x: x,
                    y: y,
                    maxTick: 2,
                  }}
                ></Animate>
              );
            }
            return (
              <Animate
                events={events}
                data={{
                  src: type,
                  sy: detail.sy,
                  x: x,
                  y: y,
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
    const { gameX, gameY } = e;
    const mapXY = {}
    const { mapTerrains, mapEvents } = this.$state.map
    const height = this.$state.map.height
    const width = this.$state.map.width
    function next(x, y, path) {
      if (x < 0 || y < 0 || x === width || x === height) {
        return false
      }
      if (mapTerrains[y][x]) {
        return false
      }
      if (mapXY[[x, y]]) {
        return false
      }
      mapXY[[x, y]] = 1;
      path.push([x, y])
      if (x === gameX && y === gameY) {
        console.log(path.slice())
        return true
      }
      const result =
        next(x - 1, y, path) ||
        next(x + 1, y, path) ||
        next(x, y - 1, path) ||
        next(x, y + 1, path)
      if (!result) {
        path.pop()
      }
      return result
    }
    const path = []
    const { x, y } = this.$state.save.position
    next(x, y, path)
    this.path = path;
  };

  render() {
    if (this.path && this.path.length) {
      const path = this.path.shift()
      const [x, y] = path;
      this.$state.save.position.x = x;
      this.$state.save.position.y = y;
    }
    const mapTerrains = this.renderMapTerrains();
    const mapEvents = this.renderMapEvents();
    return (
      <div>
        <div style={this.styles.map} onMouseDown={this.onMouseDown}>
          {mapTerrains}
          {mapEvents}
          <Hero
            mapTerrains={mapTerrains}
            mapEvents={mapEvents}
            map={this.$state.map}
            onLoadMap={this.props.onLoadMap}
            onMessage={this.props.onMessage}
            removeMapEvent={this.onRemoveMapEvent}
            onTitle={this.onTitle}
          />
        </div>
        <div style={this.styles.statusBar}>
          <Status />
        </div>
      </div>
    );
  }
}
