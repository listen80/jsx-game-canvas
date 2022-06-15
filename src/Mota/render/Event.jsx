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

  onClick() {
    console.log(this)
  }

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
