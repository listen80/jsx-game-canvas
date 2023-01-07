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

import Test from "./render/Test";

import { Component } from "Engine";
export default class Mota extends Component {
  styles = {
    app: {
      width: 20,
      height: 13,
    },
  };

  renderMap() {
    const { $state } = this;
    const { $res, map, mapKey } = $state;

    if ($res.loaded !== $res.total) {
      return <Loading rate={$res.loaded / $res.total} />;
    }

    if (map) {
      if (map.text) {
        return <ScrollText key={mapKey} />;
      }
      return <GameMap key={mapKey} />;
    }

    if (location.hash === "#test") {
      return <Test />;
    }

    return <Title />;
  }

  render() {
    const { styles, $state } = this;
    return (
      <div style={styles.app}>
        {this.renderMap()}
        {$state.shopid && (
          <Dialog>
            <Shop shopid={$state.shopid} />
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
            <Battle enemy={$state.enemy} />
          </Dialog>
        )}
        <Message />
        <Talks />
        <FPS />
      </div>
    );
  }
}
