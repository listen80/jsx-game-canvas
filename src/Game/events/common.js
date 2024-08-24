import * as save from "../utils/save";

import { clone } from "../utils/object.js";

export const startGame = "startGame";
export const endGame = "endGame";
export const loadGame = "loadGame";
export const saveGame = "saveGame";
export const gotoMap = "gotoMap";
export const gotoTitle = "gotoTitle";
export const openShop = "openShop";
export const closeShop = "closeShop";

export default {
  [startGame](data, { $state, $config }) {
    $state.save = clone($config.save);
    this.emit("gotoMap", $state.save.mapId);
  },

  [endGame](data, { $state, $config }) {
    window.close();
  },

  [loadGame](data, { $state, $config }) {
    $state.save = Object.assign(clone($config.save), save.loadGame());
    this.emit("gotoMap", $state.save.mapId);
    this.emit("message", "读档成功");
  },

  [saveGame](data, { $state }) {
    save.saveGame($state.save);
    this.emit("message", "存档成功");
  },

  [gotoMap](mapId, { $state, $loader }) {
    $state.mapId = null;
    return $loader.loadMap(mapId).then((map) => {
      const timer = setTimeout(() => {
        $state.mapId = mapId;
        clearTimeout(timer);
      });
    });
  },

  [gotoTitle](data, { $state }) {
    $state.mapId = null;
  },

  [openShop](shopId, { $state, $loader }) {
    return $loader.loadShop(shopId).then((map) => {
      $state.shopId = shopId;
    });
  },
  [closeShop](shopId, { $state, $loader }) {
    $state.shopId = null;
  },
};
