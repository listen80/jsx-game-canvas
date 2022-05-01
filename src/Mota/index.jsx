/* eslint-disable multiline-ternary */
import { Component } from 'Engine'
import FPS from './render/FPS'
import Loading from './render/Loading'
import Title from './render/Title'
import Map from './render/Map'
import ScrollText from './render/ScrollText'
import { loadJSON } from '../Engine/utils/http'
import Message from './render/Message'

const loadMap = (mapId) => {
  return loadJSON(`Maps/${mapId}.json`)
}

const size = 32

export default class Game extends Component {
  styles = {
    app: {
      height: size * 13,
      width: size * 18,
    },
  };

  async create () {
    this.loading = '加载数据'
    await this.$data.load()

    const game = this.$data.game
    document.title = game.title

    // if (game.font && game.font.load !== false) {
    //   this.loading = '加载字体'
    //   const font = game.font
    //   await this.$font.load(font)
    //   // this.styles.app.font = `${font.name}`
    // }

    if (game.images) {
      this.loading = '加载图片'
      await this.$images.load(game.images, game.sprites)
    }

    if (game.sounds) {
      this.loading = '加载音乐'
      await this.$sound.load(game.sounds)
    }

    this.loading = false

    // this.onLoadMap({ mapId: 'MT1' })
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
  };

  onMessageClose = () => {
    this.msg = null
  };

  onMessage = (msg) => {
    this.msg = msg
  };
  renderLoading() {
    return <Loading msg={this.loading} />
  }
  render () {
    // const Title = Test
    return (
      <div style={this.styles.app}>
        {this.loading ? (
          this.renderLoading()
        ) : this.map ? (
          this.map.text ? (
            <ScrollText
              map={this.map}
              onClose={this.onLoadMap}
              onTitle={this.onTitle}
            ></ScrollText>
          ) : (
            <Map
              map={this.map}
              key={this.randMapKey}
              onLoadMap={this.onLoadMap}
              onMessage={this.onMessage}
              onEvent={this.onEvent}
            />
          )
        ) : (
          <Title onLoadMap={this.onLoadMap}></Title>
        )}
        {this.msg && (
          <Message
            msg={this.msg}
            key={this.msg}
            onMessageClose={this.onMessageClose}
          />
        )}
        <FPS />
      </div>
    )
  }
}
