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
    this.emit("loadMap", $state.save.position);
  },

  loadGame(data, { $state, $config }) {
    Object.assign($state.save, $config.save, loadGame());
    this.emit("loadMap", $state.save.position);
  },

  saveGame(data, { $state }) {
    saveGame($state.save);
    this.emit("message", "ok");
  },

  loadMap(data, { $state, $loader }) {
    $state.save.position = data;
    $state.mapKey = Math.random();
    $loader.loadMap($state.save.position.map).then((map) => {
      $state.map = map;
    });
  },

  gotoTitle(data, { $state }) {
    $state.map = null;
  },

  getItems(data, { $state }) {
    setSave($state, { items: data }, next);
  },

  getItem(data, { $state }) {
    setSave($state, { items: { [data]: 1 } }, next);
  },

  setSave(data, { $state }) {
    setSave($state, data, next);
  },

  checkSave(data, { $state }) {
    return checkSave($state, data, next);
  },

  setSaveByStr(data, { $state }) {
    setSaveByStr($state, data, next);
  },

  checkSaveByStr(data, { $state }) {
    return checkSaveByStr($state, data, next);
  },
};
