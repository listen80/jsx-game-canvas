import { Component, Animate } from "Engine";
import Hero from "./Hero";
import Status from "./Status";

function transform($state, value, x, y) {
  const info = $state.mapping[value];
  const { type, name } = info;
  const detail = $state[type][name];
  let maxTick = 1
  const data = {
    src: type,
    sy: detail.sy,
    x: x,
    y: y,
    maxInterval: 30,
  }
  if (type === "animates") {
    maxTick = 4
  } else if (type === "terrains" || type === "items") {
    maxTick = 1
  } else if (type === "npcs" || type === "enemys") {
    maxTick = 2
  }
  data.maxTick = maxTick
  return data
}
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
    return this.$state.map.mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value) {
          return <animate {...transform(this.$state, value, x, y)}></animate>
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
    const { mapTerrains, mapEvents, height, width } = this.$state.map

    function check(x, y) {
      if (x < 0 || y < 0 || x === width || x === height || mapTerrains[y][x]) {
        return false
      }
      return true
    }

    function getArray(position) {
      const [x, y] = position
    }

    function next(position) {
      const { x, y } = position
      const arr = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
      ].filter(check)
      console.log(arr)
      for (let n of arr) {
        next()
      }
      if (x < 0 || y < 0 || x === width || x === height) {
        return false
      }
      // if (x === gameX && y === gameY) {
      //   console.log(path.slice())
      //   return true
      // }
      // if (mapTerrains[y][x]) {
      //   return false
      // }
      // if (mapXY[[x, y]]) {
      //   return false
      // }
      // mapXY[[x, y]] = 1;
      // path.push([x, y])

      // const result =
      //   next(x - 1, y, path) ||
      //   next(x + 1, y, path) ||
      //   next(x, y - 1, path) ||
      //   next(x, y + 1, path)
      // if (!result) {
      //   path.pop()
      // }
      return result
    }
    const path = []
    const { x, y } = this.$state.save.position
    next({ x, y }, path)

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
          {/* {mapEvents} */}
          <Hero
            mapTerrains={mapTerrains}
            mapEvents={mapEvents}
            map={this.$state.map}
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
