import { Component } from 'Engine'
import Hero from './Hero'
import Status from './Status'
export default class Map extends Component {
  tick = 0;
  interval = 10;
  styles = {
    map: {
      height: 32 * 13,
      width: 32 * 13,
      backgroundImage: 'ground.png',
    },
    statusBar: {
      x: 32 * 13,
      y: 0,
      backgroundImage: 'ground.png',
      width: 32 * 5,
      height: 13 * 32,
    },
  };

  create () {
    const bgm = this.props.map.bgm
    this.mapBgm = this.$sound.play('bgm', bgm)
  }

  destroy () {
    const bgm = this.props.map.bgm
    // this.$sound.pause('bgm', bgm)
    this.mapBgm.pause()
    console.info(111)
  }

  renderMapTerrains (status) {
    const { mapTerrains } = this.props.map
    const tick = this.tick
    const terrains = []
    if (!mapTerrains) {
      return
    }
    mapTerrains.forEach((line, y) => {
      line.forEach((value, x) => {
        if (value) {
          const info = this.$data.mapping[value]
          const { type, name } = info
          const detail = this.$data[type][name]
          let sx = 0
          if (info.type === 'animates') {
            sx = (tick % 4) * 32
          }
          const style = {
            sy: detail.sy * 32,
            sx,
            x: x * 32,
            y: y * 32,
            height: 32,
            width: 32,
          }
          terrains.push(<img src={type + '.png'} style={style} />)
        } else {
          return null
        }
      })
    })
    return terrains
  }

  renderMapEvents () {
    const { mapId, destroy = {} } = this.props.saveData
    const { mapEvents } = this.props.map
    const tick = this.tick
    const enemys = {}
    this.enemys = enemys
    if (mapEvents) {
      return mapEvents.map((event) => {
        const [x, y, value, events] = event
        if (value) {
          const info = this.$data.mapping[value]
          if (info) {
            const { type, name } = info
            const detail = this.$data[type][name]
            let sx = 0
            if (type === 'npcs' || type === 'enemys') {
              sx = (tick % 2) * 32
            }
            // terrians items icons npcs enemys
            if (destroy[[mapId, x, y]]) {
              return null
            }
            if (type === 'enemys') {
              enemys[name] = name
            }
            return (
              <div style={{ x: x * 32, y: y * 32, height: 32, width: 32 }}>
                <img
                  src={type + '.png'}
                  style={{ sy: detail.sy * 32, sx, height: 32, width: 32 }}
                />
              </div>
            )
          }
        }
        return null
      })
    }
  }

  onRemoveMapEvent = (mapEvent) => {
    const [x, y] = mapEvent
    const mapId = this.props.saveData.mapId
    this.props.saveData.destroy = this.props.saveData.destroy || {}
    this.props.saveData.destroy[[mapId, x, y]] = 1
  };

  onTitle = () => {
    this.props.onTitle()
  };

  onClick = (e) => {
    // console.log(e)
    // DFS BFS
  };

  render () {
    this.interval--
    if (this.interval === 0) {
      this.tick++
      this.interval = 10
    }
    const mapTerrains = this.renderMapTerrains()
    const mapEvents = this.renderMapEvents()
    return (
      <div>
        <div style={this.styles.map} onClick={this.onClick}>
          {mapTerrains}
          {mapEvents}
        </div>
        <div style={this.styles.statusBar}>
          <Status saveData={this.props.saveData} map={this.props.map} />
        </div>
        <Hero
          mapTerrains={mapTerrains}
          mapEvents={mapEvents}
          saveData={this.props.saveData}
          enemys={this.enemys}
          map={this.props.map}
          onLoadMap={this.props.onLoadMap}
          removeMapEvent={this.onRemoveMapEvent}
          onTitle={this.onTitle}
        />
      </div>
    )
  }
}
