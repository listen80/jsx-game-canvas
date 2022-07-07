import Hero from "./Hero";
import Status from "./Status";
import Event from "./Event"

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

  onCreate() {
    // const bgm = this.props.map.bgm;
    // this.mapBgm = this.$sound.play('bgm', bgm)
  }

  onDestroy() {
    // const bgm = this.props.map.bgm;
    // this.$sound.pause('bgm', bgm)
    // this.mapBgm.pause();
  }

  onMouseDown() {
    console.log(this)
  }

  renderMapTerrains() {
    return this.$state.map.mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value) {
          return <Event value={value} x={x} y={y} />
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
              <animate
                events={events}
                data={{
                  src: type,
                  sy: detail.sy,
                  x: x,
                  y: y,
                  maxTick: 1,
                }}
              ></animate>
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

  onMouseDown(e) {
    console.log('ok')
    // DFS BFS
  };

  render() {
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
