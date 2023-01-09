import FPS from "./render/helper/FPS";
import Message from "./render/helper/Message";
import Talks from "./render/helper/Talks";
import JumpFloor from "./render/helper/JumpFloor";

import Shop from "./render/shop/Shop";
import ShopList from "./render/shop/ShopList";

import Battle from "./render/battle/Battle";
import EnemyInfo from "./render/battle/EnemyInfo";

import Loading from "./render/scene/Loading";
import Title from "./render/scene/Title";
import GameMap from "./render/scene/GameMap";
import ScrollText from "./render/scene/ScrollText";

import Config from "./render/tool/Config";
import Statistics from "./render/tool/Statistics";

import Test from "./render/test/Test";

import Dialog from "./components/Dialog";

import { Component } from "Engine";
import event from "./events/common";

export default class Mota extends Component {
  onCreate() {
    Object.entries(event).forEach(([key, value]) => {
      this.$event.on(key, value);
    });
  }

  renderMap() {
    const { $state } = this;
    const { map, mapKey } = $state;
    if (map) {
      const { text, movie } = map;
      if (text) {
        return <ScrollText key={mapKey} />;
      }
      if (movie) {
        return <ScrollText key={mapKey} />;
      }
      return <GameMap key={mapKey} />;
    } else {
      return <Title />;
    }
  }

  renderDialog() {
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
        <Dialog show={shopid}>
          <Shop />
        </Dialog>
        <Dialog show={showShopList}>
          <ShopList />
        </Dialog>
        <Dialog show={showEnemyInfo}>
          <EnemyInfo />
        </Dialog>
        <Dialog show={showJumpFloor}>
          <JumpFloor />
        </Dialog>
        <Dialog show={showBattle}>
          <Battle />
        </Dialog>
        <Dialog show={showConfig}>
          <Config />
        </Dialog>
        <Dialog show={showStatistics}>
          <Statistics />
        </Dialog>
      </div>
    );
  }

  render() {
    const { $loader } = this;

    if ($loader.loading) {
      return <Loading />;
    }

    if (location.hash === "#test") {
      return <Test />;
    }

    return (
      <div>
        {this.renderMap()}
        {this.renderDialog()}
        <Message />
        <Talks />
        <FPS />
      </div>
    );
  }
  // render() {
  //   return <div style={{x: 0, y: 1, backgroundColor: 'red', width: 1, height: 1}}>
  //     [1234]
  //   </div>
  // }
}
