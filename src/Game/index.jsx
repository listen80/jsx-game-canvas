import Loading from "./game/scene/Loading";

import FPS from "./game/helper/FPS";
import Title from "./game/scene/Title";
import ScrollText from "./game/scene/ScrollText";
import Movie from "./game/scene/Movie";
import GameMap from "./game/scene/GameMap";

import Message from "./game/helper/MessageBox";
import Modal from "#/Layout/Modal";

// 楼层跳转
import Aircraft from "./game/modal/Aircraft";

// 商店
import Shop from "./game/modal/Shop";

// 商店列表
import ShopList from "./game/modal/ShopList";

// 战斗画面
import Battle from "./game/modal/Battle";

// 敌人信息
import EnemyInfo from "./game/modal/EnemyInfo";

// 配置信息
import Config from "./game/modal/Config";

// 统计信息
import Statistics from "./game/modal/Statistics";

// 全局事件
import commonEvent from "./events/common";

// 全局声音事件
import soundEvent from "./events/sound";

// 全局魔塔
import motaEvent from "./events/mota";

export default {
  onCreate() {
    this.$event.registry(commonEvent, motaEvent, soundEvent);
  },

  renderMap() {
    const { $state } = this;
    const { map, mapKey } = $state;
    if (map) {
      const { text, movie } = map;
      if (text) {
        return <ScrollText key={mapKey} />;
      }
      if (movie) {
        return <Movie key={mapKey} />;
      }
      return <GameMap key={mapKey} />;
    } else {
      return <Title />;
    }
  },

  renderModal() {
    const { $state } = this;
    const {
      shopid,
      showShopList,
      showEnemyInfo,
      showJumpFloor,
      showBattle,
      showConfig,
      showStatistics,
    } = $state;
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
        <Modal show={showJumpFloor}>
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
    );
  },

  renderApp() {
    const { $loader, $config } = this;

    if ($loader.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          {this.renderMap()}
          {/* {this.renderModal()} */}
          <Message />
          {/* <Talks /> */}
        </div>
      );
    }
  },

  render() {
    return (
      <div>
        {this.renderApp()}
        <FPS />
      </div>
    );
  },
};
