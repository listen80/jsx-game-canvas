import { Component } from 'Engine'
import FPS from './Mota/FPS'
import Loading from './Mota/Loading'
import Title from './Mota/Title'
import Map from './Mota/Map'
import ScrollText from './Mota/ScrollText'
import { loaderData, loaderMusic, loaderImage, loadMap, loaderFont } from './loader'

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
    const font = window.$res.game.font
    await loaderFont(font)
    this.styles.app.fontFamily = font.name
  }

  async create () {
    this.loading = '加载数据'
    await loaderData()
    this.loading = '加载图片'
    await loaderImage()
    this.loading = '加载音乐'
    await loaderMusic()
    this.loading = false

    this.saveData = window.$res.save
  }

  onLoadMap = async (data) => {
    this.loading = '加载地图'
    Object.assign(this.saveData, data)
    this.map = await loadMap(this.saveData.mapId)
    this.loading = false
    this.randMapKey = `${this.saveData.mapId} ${new Date()}`
    window.$sound.play('se', 'floor.mp3')
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
