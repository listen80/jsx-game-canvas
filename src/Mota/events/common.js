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
  startGame(data, { $state, $sound, $loader, $config }) {
    $state.save = clone($config.save);
    this.emit("loadMap", $state.save.position);
  },

  loadGame(data, { $state, $sound, $loader }) {
    Object.assign($state.save, loadGame());
    $loader.loadMap($state.save.mapId);
  },

  saveGame(data, { $state, $sound, $loader }) {
    saveGame($state.save);
  },

  loadMap(position, { $state, $sound, $loader }) {
    $state.save.position = position;
    $state.mapKey = Math.random();
    $loader.loadMap($state.save.position.map).then((map) => {
      $state.map = map;
    });
  },

  gotoTitle(data, { $state, $sound, $loader }) {
    $state.map = null;
  },

  getItems(data, { $state, $sound, $loader }) {
    setSave($state, { items: data }, next);
  },

  getItem(data, { $state, $sound, $loader }) {
    setSave($state, { items: { [data]: 1 } }, next);
  },

  setSave(data, { $state, $sound, $loader }) {
    setSave($state, data, next);
  },

  checkSave(data, { $state, $sound, $loader }) {
    return checkSave($state, data, next);
  },

  setSaveByStr(data, { $state, $sound, $loader }) {
    setSaveByStr($state, data, next);
  },

  checkSaveByStr(data, { $state, $sound, $loader }) {
    return checkSaveByStr($state, data, next);
  },
};
