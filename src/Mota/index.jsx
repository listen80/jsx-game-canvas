import FPS from "./render/helper/FPS";
import Loading from "./render/scene/Loading";
import Title from "./render/scene/Title";
import GameMap from "./render/scene/GameMap";
import ScrollText from "./render/scene/ScrollText";
import Message from "./render/helper/Message";
import Talks from "./render/helper/Talks";
import JumpFloor from "./render/helper/JumpFloor";
import Shop from "./render/shop/Shop";
import ShopList from "./render/shop/ShopList";

import Battle from "./render/battle/Battle";
import EnemyInfo from "./render/battle/EnemyInfo";
import Dialog from "./components/Dialog";

import Test from "./render/test/Test";
import Config from "./render/tool/Config";

import { Component } from "Engine";

export default class Mota extends Component {
  onCreate() {}

  renderMap() {
    const { $state } = this;
    const { map, mapKey } = $state;
    if (map) {
      if (map.text) {
        return <ScrollText key={mapKey} />;
      }
      return <GameMap key={mapKey} />;
    }

    return <Title />;
  }

  renderDialog() {
    const { $state } = this;
    const {
      shopid,
      showShopList,
      showEnemyInfo,
      showJumpFloor,
      enemy,
      showConfig,
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
        <Dialog show={enemy}>
          <Battle />
        </Dialog>
        <Dialog show={showConfig}>
          <Config />
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
}
