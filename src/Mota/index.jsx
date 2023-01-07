import FPS from "./render/helper/FPS";
import Loading from "./render/scene/Loading";
import Title from "./render/scene/Title";
import GameMap from "./render/scene/GameMap";
import ScrollText from "./render/scene/ScrollText";
import Message from "./render/helper/Message";
import Talks from "./render/helper/Talks";
import Shop from "./render/shop/Shop";
import Battle from "./render/battle/Battle";
import EnemyInfo from "./render/battle/EnemyInfo";
import Test from "./render/Test";

import { Component } from "Engine";
export default class Mota extends Component {
  styles = {
    app: {
      width: 18,
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
    return (
      <div style={this.styles.app}>
        {this.renderMap()}
        {this.$state.shopid && <Shop shopid={this.$state.shopid} />}
        <EnemyInfo enemys={[]}/>
        <Battle />
        <Message />
        <Talks />
        <FPS />
      </div>
    );
  }
}
