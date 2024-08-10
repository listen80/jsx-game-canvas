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
  },

  saveGame(data, { $state }) {
    saveGame($state.save);
    this.emit("message", "ok");
  },

  gotoMap(data, { $state, $loader }) {
    $state.save.position = data;
    console.log(data);
    $state.mapKey = data.map;
    $loader.loadMap($state.save.position.map).then((map) => {
      $state.map = map;
    });
  },

  gotoTitle(data, { $state }) {
    $state.map = null;
  },
};
