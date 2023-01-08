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
    return (
      <div>
        {$state.shopid && (
          <Dialog>
            <Shop />
          </Dialog>
        )}
        {$state.showShopList && (
          <Dialog>
            <ShopList />
          </Dialog>
        )}
        {$state.showEnemyInfo && (
          <Dialog>
            <EnemyInfo />
          </Dialog>
        )}
        {$state.showJumpFloor && (
          <Dialog>
            <JumpFloor />
          </Dialog>
        )}
        {$state.enemy && (
          <Dialog>
            <Battle />
          </Dialog>
        )}
        {$state.showConfig && (
          <Dialog>
            <Config />
          </Dialog>
        )}
      </div>
    );
  }

  render() {
    const { $state } = this;
    const { $res } = $state;

    if ($res.loaded !== $res.total) {
      return <Loading rate={$res.loaded / $res.total} />;
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
