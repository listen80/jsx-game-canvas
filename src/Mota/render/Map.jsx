import { Component, Animate } from 'Engine'
import Hero from './Hero'
import Status from './Status'

const size = 32
export default class Map extends Component {
  tick = 0;
  interval = 10;
  styles = {
    map: {
      height: size * 13,
      width: size * 13,
      backgroundImage: 'ground.png',
    },
    statusBar: {
      x: size * 13,
      y: 0,
      backgroundImage: 'ground.png',
      width: size * 5,
      height: 13 * size,
    },
  };

  create () {
    const bgm = this.props.map.bgm
    // this.mapBgm = this.$sound.play('bgm', bgm)
  }

  destroy () {
    const bgm = this.props.map.bgm
    // this.$sound.pause('bgm', bgm)
    this.mapBgm.pause()
  }

  renderMapTerrains (status) {
    const { mapTerrains } = this.props.map
    const tick = this.tick
    const terrains = []
    if (!mapTerrains) {
      return
    }
    let sx = 0
    mapTerrains.forEach((line, y) => {
      line.forEach((value, x) => {
        if (value) {
          const info = this.$data.mapping[value]
          const { type, name } = info
          const detail = this.$data[type][name]

          if (type === 'animates') {
            sx = (tick % 4) * size
            const style = {
              sy: detail.sy * size,
              sx,
              x: x * size,
              y: y * size,
              height: size,
              width: size,
            }
            terrains.push(<img src={type + '.png'} style={style} />)
          } else if (type === 'terrains') {
            const style = {
              sy: detail.sy * size,
              sx: 0,
              x: x * size,
              y: y * size,
              height: size,
              width: size,
            }
            terrains.push(<img src={type + '.png'} style={style} />)
          } else {
            console.error('error type', type, info)
          }
        }
      })
    })
    return terrains
  }

  renderMapEvents () {
    const { mapId, destroy = {} } = this.$data.save
    const { mapEvents } = this.props.map
    const tick = this.tick
    const enemys = {}
    this.enemys = enemys
    if (mapEvents) {
      return mapEvents.map((event) => {
        const [x, y, value, events] = event
        if (destroy[[mapId, x, y]]) {
          return null
        }
        if (value) {
          const info = this.$data.mapping[value]
          if (info) {
            const { type, name } = info
            const detail = this.$data[type][name]
            // terrains items icons npcs enemys
            let sx = 0
            if (type === 'npcs' || type === 'enemys') {
              sx = (tick % 2) * size
            }

            if (type === 'enemys') {
              enemys[name] = name
            }
            return (
              <div style={{ x: x * size, y: y * size, height: size, width: size }}>
                <img
                  src={type + '.png'}
                  style={{ sy: detail.sy * size, sx, height: size, width: size }}
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
    const mapId = this.$data.save.mapId
    this.$data.save.destroy = this.$data.save.destroy || {}
    this.$data.save.destroy[[mapId, x, y]] = 1
  };

  onTitle = () => {
    this.props.onTitle()
  };

  onMouseDown = (e) => {
    // DFS BFS
    console.warn(e)
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
        <div style={this.styles.map} onMouseDown={this.onMouseDown}>
          {mapTerrains}
          {mapEvents}
        </div>
        <div style={this.styles.statusBar}>
          <Status map={this.props.map} />
        </div>
        <Hero
          mapTerrains={mapTerrains}
          mapEvents={mapEvents}
          enemys={this.enemys}
          map={this.props.map}
          onLoadMap={this.props.onLoadMap}
          onMessage={this.props.onMessage}
          removeMapEvent={this.onRemoveMapEvent}
          onTitle={this.onTitle}
        />
      </div>
    )
  }
}
