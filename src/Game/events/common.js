import {
  loadGame,
  saveGame,
  setSave,
  checkSave,
  setSaveByStr,
  checkSaveByStr,
} from "../utils/game";

import { clone } from "../utils/object.js";

export default {
  startGame(data, { $state, $config }) {
    $state.save = clone($config.save);
    this.emit("gotoMap", $state.save.position);
  },

  loadGame(data, { $state, $config }) {
    $state.save = Object.assign(clone($config.save), loadGame());
    this.emit("gotoMap", $state.save.position);
    this.emit("message", "读档成功");
  },

  saveGame(data, { $state }) {
    saveGame($state.save);
    this.emit("message", "存档成功");
  },

  gotoMap(data, { $state, $loader }) {
    return $loader.loadMap(data.map).then((map) => {
      console.log(map);
      $state.save.position = data;
      $state.mapKey = `${data.map} ${new Date()}`;
      $state.map = map;
    });
  },

  gotoTitle(data, { $state }) {
    $state.map = null;
  },
};
