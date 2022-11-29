import FPS from './render/helper/FPS'
import Loading from './render/base/Loading'
import Title from './render/base/Title'
import GameMap from './render/GameMap'
import ScrollText from './render/base/ScrollText'
import Message from './render/helper/Message'
import Talks from './render/helper/Talks'
import Shop from './render/shop/Shop'
import Test from './render/Test'
import Battle from './render/battle/Battle'

import animate from './components/Animate.jsx'
import select from './components/Select.jsx'
import table from './components/Table.jsx'
import scroll from './components/Scroll.jsx'

import { registryComponents, Component } from 'Engine'

export default class Mota extends Component {
  styles = {
    app: {
      width: 18,
      height: 13,
    },
  };

  onCreate () {
    registryComponents({ animate, select, table, scroll })
  }

  renderMap () {
    const $res = this.$state.$res
    if ($res.loaded !== $res.total) {
      return <Loading rate={$res.loaded / $res.total} />
    }
    if (this.$state.map) {
      if (this.$state.map.text) {
        return <ScrollText key={this.$state.mapKey} />
      }
      return <GameMap key={this.$state.mapKey} />
    }
    if (location.hash === '#test') {
      return <Test />
    }

    return <Title />
  }

  render () {
    return (
      <div style={this.styles.app}>
        {this.renderMap()}
        {this.$state.shopid && <Shop shopid={this.$state.shopid} />}
        <Battle />
        <Message />
        <Talks />
        <FPS />
      </div>
    )
  }
}
