import { Component, KeyEventComponent } from 'Engine'
import FPS from './render/FPS'
import Loading from './render/Loading'
import Title from './render/Title'
import Map from './render/Map'
import ScrollText from './render/ScrollText'
import { loadMap } from '../Engine/loader'

const run = {
  src: 'run.png',
  maxTick: 6,
  width: 996 / 6,
  height: 824 / 8,
}

const stand = {
  src: 'stand.png',
  maxTick: 4,
  width: 632 / 4,
  height: 768 / 8,
}

const skill = {
  src: 'skill.png',
  maxTick: 4,
  width: 912 / 6,
  height: 800 / 8,
  loop: false,
}
class Animate extends Component {
  styles = {
    app: {
      height: 32 * 13,
      width: 32 * 18,
      backgroundColor: '#ccc',
    },
  };

  interval = -1
  tick = 0
  create () {
    this.data = stand
  }

  x = 0
  sy = 0
  onClick = (e) => {
    const { offsetX, offsetY } = e
    console.log(e)
    this.sy++
  }

  destroy () {
    // super.destroy()
    console.log('Animate destory')
  }

  render () {
    const { width, height, src, maxTick, maxInterval = 7, loop } = this.data
    this.interval++
    if (this.interval === maxInterval) {
      this.interval = 0
      this.tick++
      if (this.tick === maxTick) {
        this.tick = 0
        if (loop === false) {
          // this.data = stand
          // return
        }
      }
    }
    // this.x++
    return <div style={this.styles.app} onClick={this.onClick}>
      <img
        src={src}
        style={{
          x: -width / 2 + 200 + this.x,
          y: -height / 2 + 200,
          sx: this.tick * width,
          sy: height * this.sy,
          width: width,
          height: height,
        }}>
        </img>
      </div>
  }
}
class Test extends KeyEventComponent {
  onKeyDown = ({ code }) => {
    console.log(code)
  }

  render () {
    return <div>

<Animate/>

    </div>
  }

  destroy () {
    super.destroy()
    console.log('destory')
  }
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
    if (game.font && game.font.load !== false) {
      this.loading = '加载字体'
      const font = game.font
      await this.$font.load(font)
      this.styles.app.fontFamily = font.name
    }
    document.title = game.title
    this.loading = '加载图片'
    await this.$images.load(game.sprite)
    this.loading = '加载音乐'
    await this.$sound.load(game.sounds)
    this.loading = false
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

  tick = false
  render () {
    // return <div style={{}}>
    //   <div>22</div>
    // </div>
    this.tick = !this.tick
    if (this) {
      if (!this.loading) {
        return <Test>
          </Test>
      }
    }
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
            : <Title onLoadMap={this.onLoadMap} />
      }
      <FPS />
    </div>
  }
}
