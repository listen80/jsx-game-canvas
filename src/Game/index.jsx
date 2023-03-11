import Modal from '#/Layout/Modal'
import FPS from './game/helper/FPS' // Fps显示

import Loading from './game/scene/Loading' // Loading界面
import Title from './game/scene/Title' // 游戏选择界面
import ScrollText from './game/scene/ScrollText' // 滚动文字 过场界面
import Movie from './game/scene/Movie' // 过场电影
import Map from './game/scene/Map' // Map 游戏地图
import Message from './game/helper/MessageBox' // 全局信息

import ShopList from './game/modal/ShopList' // 商店列表
import Aircraft from './game/modal/Compass' // 楼层跳转
import Shop from './game/modal/Shop' // 商店
import Battle from './game/modal/Battle' // 战斗画面
import EnemyInfo from './game/modal/EnemyInfo' // 敌人信息
import Config from './game/modal/Config' // 配置信息
import Statistics from './game/modal/Statistics' // 统计信息

import commonEvent from './events/common' // 全局事件
import soundEvent from './events/sound' // 全局声音事件
import motaEvent from './events/mota' // 全局魔塔

export default {
  onCreate () {
    this.$event.registry(commonEvent, motaEvent, soundEvent)
  },

  renderMap () {
    const { $state } = this
    const { map, mapKey } = $state
    if (map) {
      const { text, movie } = map
      if (text) {
        return <ScrollText key={mapKey} />
      }
      if (movie) {
        return <Movie key={mapKey} />
      }
      return <Map key={mapKey} />
    } else {
      return <Title />
    }
  },

  renderModal () {
    const { $state } = this
    const {
      shopid,
      showShopList,
      showEnemyInfo,
      showCompass,
      showBattle,
      showConfig,
      showStatistics,
    } = $state
    return (
      <div>
        <Modal show={shopid}>
          <Shop />
        </Modal>
        <Modal show={showShopList}>
          <ShopList />
        </Modal>
        <Modal show={showEnemyInfo}>
          <EnemyInfo />
        </Modal>
        <Modal show={showCompass}>
          <Aircraft />
        </Modal>
        <Modal show={showBattle}>
          <Battle />
        </Modal>
        <Modal show={showConfig}>
          <Config />
        </Modal>
        <Modal show={showStatistics}>
          <Statistics />
        </Modal>
      </div>
    )
  },

  renderApp () {
    const { $loader, $config } = this

    if ($loader.loading) {
      return <Loading />
    } else {
      return (
        <div>
          {this.renderMap()}
          {this.renderModal()}
          <Message />
          {/* <Talks /> */}
        </div>
      )
    }
  },

  render () {
    return (
      <div>
        {this.renderApp()}
        <FPS />
      </div>
    )
  },
}
