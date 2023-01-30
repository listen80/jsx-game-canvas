import Loading from "./game/scene/Loading";

import FPS from "./game/helper/FPS";
import Title from "./game/scene/Title";
import ScrollText from "./game/scene/ScrollText";
import GameMap from "./game/scene/GameMap";


import Message from "./game/helper/MessageBox";
import Dialogue from "./game/helper/Dialogue";
// import JumpFloor from "./game/helper/JumpFloor";

// import Shop from "./game/shop/Shop";
// import ShopList from "./game/shop/ShopList";

// import Battle from "./game/battle/Battle";
// import EnemyInfo from "./game/battle/EnemyInfo";



// import Config from "./game/tool/Config";
// import Statistics from "./game/tool/Statistics";

// import Dialog from "./components/Dialog";

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
        return <ScrollText key={mapKey} />;
      }
      return <GameMap key={mapKey} />;
    } else {
      return <Title />;
    }
  },

  // renderDialog() {
  //   const { $state } = this;
  //   const {
  //     shopid,
  //     showShopList,
  //     showEnemyInfo,
  //     showJumpFloor,
  //     showBattle,
  //     showConfig,
  //     showStatistics,
  //   } = $state;
  //   return (
  //     <div>
  //       <Dialog show={shopid}>
  //         <Shop />
  //       </Dialog>
  //       <Dialog show={showShopList}>
  //         <ShopList />
  //       </Dialog>
  //       <Dialog show={showEnemyInfo}>
  //         <EnemyInfo />
  //       </Dialog>
  //       <Dialog show={showJumpFloor}>
  //         <JumpFloor />
  //       </Dialog>
  //       <Dialog show={showBattle}>
  //         <Battle />
  //       </Dialog>
  //       <Dialog show={showConfig}>
  //         <Config />
  //       </Dialog>
  //       <Dialog show={showStatistics}>
  //         <Statistics />
  //       </Dialog>
  //     </div>
  //   );
  // },

  renderApp() {
    const { $loader } = this;

    if ($loader.loading) {
      return <Loading />;
    } else {
      return <div>
        {this.renderMap()}
        {/* {this.renderDialog()} */}
        <Message /> 
        {/* <Talks /> */}
      </div>
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

