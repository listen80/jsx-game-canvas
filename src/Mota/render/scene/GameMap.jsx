import Status from "../helper/Status";
import Operation from "../helper/OperationBar";
import Hero from "../char/Hero";
import EventBlock from "../event/EventBlock";
import { Component } from "Engine";
import { screenWidth, screenHeight } from "../../config";

export default class GameMap extends Component {
  styles = {
    wrap: {
      backgroundImage: "Background/ground.png",
      width: screenWidth,
      height: 13,
    },
    map: {
      x: 5,
    },
    statusBar: {
      x: 18,
    },
    operationBar: {
      x: 1,
    },
  };

  createWall() {
    this.walls = [];
    for (let x = 0; x < screenWidth; x++) {
      for (let y = 0; y < 13; y++) {
        if (
          x === 0 ||
          x === screenWidth - 1 ||
          y === 0 ||
          y === screenHeight - 1
        ) {
          this.walls.push(<div image="terrains" style={{ sy: 2, x, y }}></div>);
        }
      }
    }
  }

  onCreate() {
    this.$event.on("removeMapEventByKey", ($state, id) => {
      $state.save.destroy[id] = 1;
      this.map = this.createMap();
    });

    // const bgm = this.props.map.bgm;
    // this.mapBgm = this.$sound.play('bgm', bgm)
    this.map = this.createMap();
    this.createWall();
    this.$event.emit("setMessage", this.$state.map.name);
  }

  getKey(x, y) {
    const mapId = this.$state.save.mapId;
    const key = [mapId, x, y] + "";
    return key;
  }

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
  }

  onDestroy() {
    // const bgm = this.props.map.bgm;
    // this.$sound.pause('bgm', bgm)
    // this.mapBgm.pause();
  }

  onMouseDown = (e) => {
    const { gameX: x, gameY: y } = e;

    const { height, width } = this.$state.map;
    const { map } = this;
    this.$event.emit("setPath", {
      map: { height, width, map },
      dist: { x, y },
    });
  };

  onEventClick = (block) => {
    const { x, y } = block.props;
    const { height, width } = this.$state.map;
    const { map } = this;
    this.$event.emit("setPath", {
      map: { height, width, map },
      dist: { x, y },
    });
  };

  renderMapTerrains() {
    return this.map.map((line, y) =>
      line.map((value, x) =>
        value ? (
          <EventBlock
            value={value}
            x={x}
            y={y}
            id={this.getKey(x, y)}
            onMouseDown={this.onEventClick}
            event={this.map[y + "," + x]}
          />
        ) : null
      )
    );
  }

  render() {
    const { styles } = this;
    return (
      <div style={styles.wrap}>
        <div style={styles.map} onMouseDown={this.onMouseDown}>
          {this.renderMapTerrains()}
          <Hero map={this.map} terrains={this.terrains} />
        </div>
        <div style={styles.statusBar}>
          <Status />
        </div>
        <div style={styles.operationBar}>
          <Operation></Operation>
        </div>
        {this.walls}
      </div>
    );
  }
}
