import FPS from "@/ui/helper/FPS"; // Fps显示

import Msg from "@/ui/helper/Msg"; // 全局弹出消息
import Talk from "@/ui/helper/Talk"; // 人物对话

import Loading from "@/ui/scene/Loading"; // Loading界面
import Title from "@/ui/scene/Title"; // 游戏选择界面
import ScrollText from "@/ui/scene/ScrollText"; // 滚动文字 过场界面
import Movie from "@/ui/scene/Movie"; // 过场电影
import Window from "@/ui/scene/Window"; // Map 游戏地图

import Modal from "@/components/Layout/Modal"; // Modal

import ShopList from "@/ui/modal/ShopList"; // 商店列表
import Compass from "@/ui/modal/Compass"; // 楼层跳转
import Shop from "@/ui/modal/Shop"; // 商店
import Battle from "@/ui/modal/Battle"; // 战斗画面
import EnemyInfo from "@/ui/modal/EnemyInfo"; // 敌人信息
import Config from "@/ui/modal/Config"; // 配置信息
import Statistics from "@/ui/modal/Statistics"; // 统计信息

import commonEvent from "@/events/common"; // 全局事件
import soundEvent from "@/events/sound"; // 全局声音事件
import motaEvent from "@/events/mota"; // 全局魔塔

export default {
  onCreate() {
    this.$event.registry(commonEvent, motaEvent, soundEvent);
  },

  renderWindow() {
    const { $state } = this;
    const { mapId } = $state;
    const map = this.$loader.$resource.maps[mapId];
    // const map = null;
    if (map) {
      const { text, movie } = map;
      if (text) {
        return <ScrollText />;
      } else if (movie) {
        return <Movie />;
      } else {
        return <Window />;
      }
    } else {
      return <Title />;
    }
  },

  renderModal() {
    const { $state } = this;
    const {
      shopId,
      showShopList,
      showEnemyInfo,
      showCompass,
      showBattle,
      showConfig,
      showStatistics,
    } = $state || {};
    return (
      <>
        <Modal
          show={showEnemyInfo}
          onClose={() => ($state.showEnemyInfo = false)}
        >
          <EnemyInfo />
        </Modal>

        <Modal show={showCompass}>
          <Compass />
        </Modal>

        <Modal show={showShopList}>
          <ShopList />
        </Modal>
        <Modal show={shopId}>
          <Shop />
        </Modal>

        <Modal show={showConfig}>
          <Config />
        </Modal>
        <Modal show={showStatistics}>
          <Statistics />
        </Modal>

        <Modal show={showBattle}>
          <Battle />
        </Modal>
      </>
    );
  },

  renderDemo() {
    return (
      <view
        onClick={() => alert(1)}
        style={{ font: "18px 楷体" }}
        position={{ x: 4, y: 5 }}
        textAlign='center'
        size={{ width: 5, height: 5 }}
        bgColor='red'
      >
        <view
          position={{ x: 1, y: 1 }}
          style={{ font: "22px 楷体" }}
          bgColor='blue'
          size={{ width: 2, height: 2 }}
          onClick={() => alert(2)}
        >
          textProps
          <view
            position={{ x: 1, y: 1 }}
            size={{ width: 2, height: 2 }}
            bgColor='yellow'
            onClick={(e) => {
              e.stopPropagation();
              alert(3);
            }}
          >
            222
          </view>
        </view>
      </view>
    );
  },

  render() {
    // return this.renderDemo();

    const { $loader } = this;
    if ($loader.loading) {
      return <Loading />;
    } else {
      return (
        <>
          {this.renderWindow()}
          {this.renderModal()}
          <Msg />
          <Talk />
          <FPS />
        </>
      );
    }
  },
};
