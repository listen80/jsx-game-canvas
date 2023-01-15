import FPS from "./game/helper/FPS";
// import Message from "./game/helper/MessageBox";
// import Talks from "./game/helper/Talks";
// import JumpFloor from "./game/helper/JumpFloor";

// import Shop from "./game/shop/Shop";
// import ShopList from "./game/shop/ShopList";

// import Battle from "./game/battle/Battle";
// import EnemyInfo from "./game/battle/EnemyInfo";

// import Loading from "./game/scene/Loading";
// import Title from "./game/scene/Title";
// import GameMap from "./game/scene/GameMap";
// import ScrollText from "./game/scene/ScrollText";

// import Config from "./game/tool/Config";
// import Statistics from "./game/tool/Statistics";

// import Test from "./game/test/Test";

// import Dialog from "./components/Dialog";

import commonEvent from "./events/common";
import motaEvent from "./events/mota";
import soundEvent from "./events/sound";

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


  render() {
    const { $loader } = this;
    this.x += 1

    // if ($loader.loading) {
    //   return <Loading />;
    // }

    // if (location.hash === "#test") {
    //   return <Test />;
    // }

    return (
      <div text={this.x} position={{ x: 3, y: 3 }}>
        {/* {this.renderMap()} */}
        {/* {this.renderDialog()} */}
        {/* <Message /> */}
        {/* <Talks /> */}
        <FPS />
      </div>
    );
  },
};
