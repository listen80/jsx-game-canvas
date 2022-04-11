import { Component } from 'Engine'
import FPS from './render/FPS'
import Loading from './render/Loading'
import Title from './render/Title'
import Map from './render/Map'
import ScrollText from './render/ScrollText'
import { loadMap } from '../Engine/loader'

import { sounds, sprite } from './const/list'
export default class Game extends Component {
  styles = {
    app: {
      height: 32 * 13,
      width: 32 * 18,
      textAlign: 'center',
      textBaseline: 'middle',
    },
  };

  async loadFont () {
    this.loading = '加载字体'
    const font = this.$data.game.font
    await loaderFont(font)
    this.styles.app.fontFamily = font.name
  }

  async create () {
    this.loading = '加载数据'
    await this.$data.load()
    this.loading = '加载图片'
    // console.log(this.$images)
    await this.$images.load(sprite)
    this.loading = '加载音乐'
    await this.$sound.load(sounds)
    this.loading = false
    this.saveData = this.$data.save
  }

  onLoadMap = async (data) => {
    this.loading = '加载地图'
    Object.assign(this.saveData, data)
    this.map = await loadMap(this.saveData.mapId)
    this.loading = false
    this.randMapKey = `${this.saveData.mapId} ${new Date()}`
    this.$sound.play('se', 'floor.mp3')
  };

  onTitle = () => {
    this.map = null
  }

  render () {
    return <div style={this.styles.app}>
        {
          this.loading
            ? <Loading msg={this.loading} />
            : this.map
              ? this.map.text
                ? <ScrollText map={this.map} onClose={this.onLoadMap} onTitle={this.onTitle}></ScrollText>
                : <Map
                  map={this.map}
                  key={this.randMapKey}
                  onLoadMap={this.onLoadMap}
                  saveData={this.saveData}
                  onEvent={this.onEvent}
                />
              : <Title onLoadMap={this.onLoadMap} />
        }
        <FPS />
      </div>
  }
}
