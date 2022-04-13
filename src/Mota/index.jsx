import { Component, KeyEventComponent } from 'Engine'
import FPS from './render/FPS'
import Loading from './render/Loading'
import Title from './render/Title'
import Map from './render/Map'
import ScrollText from './render/ScrollText'
import Test from './test'
import { loadJSON } from '../Engine/utils/http'

const loadMap = mapId => {
  return loadJSON(`Maps/${mapId}.json`)
}

export default class Game extends Component {
  styles = {
    app: {
      height: 32 * 13,
      width: 32 * 18,
      textAlign: 'center',
      textBaseline: 'middle',
    },
  };

  async create () {
    this.loading = '加载数据'
    await this.$data.load()

    const game = this.$data.game
    document.title = game.title

    if (game.font && game.font.load !== false) {
      this.loading = '加载字体'
      const font = game.font
      await this.$font.load(font)
      this.styles.app.fontFamily = font.name
    }

    if (game.images) {
      this.loading = '加载图片'
      await this.$images.load(game.images, game.sprites)
    }

    if (game.sounds) {
      this.loading = '加载音乐'
      await this.$sound.load(game.sounds)
    }

    this.loading = false

    this.onLoadMap({ mapId: 'MT1' })
  }

  onLoadMap = async (data) => {
    this.loading = '加载地图'
    Object.assign(this.$data.save, data)
    this.map = await loadMap(this.$data.save.mapId)
    this.loading = false
    this.randMapKey = `${this.$data.save.mapId} ${new Date()}`
  };

  onTitle = () => {
    this.map = null
  }

  render () {
    // const Title = Test
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
                onEvent={this.onEvent}
              />
            : <Title onLoadMap={this.onLoadMap}></Title>
      }
      <FPS />
    </div>
  }
}
