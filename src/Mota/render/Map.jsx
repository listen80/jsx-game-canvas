import Hero from "./Hero";
import Status from "./base/Status";
import EventBlock from "./EventBlock"
import { registryComponents, Component } from "Engine"

export default class GameMap extends Component {
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
    this.$registry('removeMapEvent', ($state, data) => {
      const { x, y } = data.props;
      $state.save.destroy[this.getKey(x, y)] = 1;
      this.map = this.createMap()
    })

    // const bgm = this.props.map.bgm;
    // this.mapBgm = this.$sound.play('bgm', bgm)
    this.map = this.createMap()
  }

  getKey(x, y) {
    const mapId = this.$state.save.mapId;
    const key = [mapId, x, y] + ''
    return key
  }

  createMap() {
    const map = this.$state.map.mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value && !this.$state.save.destroy[this.getKey(x, y)]) {
          return value
        } else {
          return null;
        }
      });
    });
    this.$state.map.mapEvents.forEach(element => {
      const [x, y, value, event] = element
      map[y][x] = value
      map[y + ',' + x] = event
    });
    return map
  }

  onDestroy() {
    // const bgm = this.props.map.bgm;
    // this.$sound.pause('bgm', bgm)
    // this.mapBgm.pause();
  }

  onMouseDown(e) {
    const { gameX: x, gameY: y } = e

    const { height, width } = this.$state.map
    const { map } = this
    this.$hook('setPath', {
      map: { height, width, map },
      dist: { x, y }
    })
  }

  onEventClick = (block) => {
    const { x, y } = block.props
    const { height, width } = this.$state.map
    const { map } = this
    this.$hook('setPath', {
      map: { height, width, map },
      dist: { x, y }
    })
  }

  renderMapTerrains() {
    return this.map.map((line, y) => line.map((value, x) => value ? <EventBlock value={value} x={x} y={y} onClick={this.onEventClick} event={this.map[y + ',' + x]} /> : null));
  }

  render() {
    this.terrains = this.renderMapTerrains()
    return (
      <div>
        <div style={this.styles.map} onMouseDown={this.onMouseDown}>
          {this.terrains}
          <Hero map={this.map} terrains={this.terrains} />
        </div>
        <div style={this.styles.statusBar}>
          <Status />
        </div>
      </div>
    );
  }
}
