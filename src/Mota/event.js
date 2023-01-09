import {
  loadGame,
  saveGame,
  setSave,
  checkSave,
  setSaveByStr,
  checkSaveByStr,
} from "./utils/game";

const config = {
  startGame(data, { $state, $sound, $loader }) {
    Object.assign($state.save, $state.config.save);
    $loader.loadMap($state.save.mapId);
  },

  loadGame(data, { $state, $sound, $loader }) {
    Object.assign($state.save, loadGame());
    $loader.loadMap($state.save.mapId);
  },

  saveGame(data, { $state, $sound, $loader }) {
    saveGame($state.save);
  },

  loadMap(data, { $state, $sound, $loader }) {
    $state.mapKey = Math.random();
    Object.assign($state.save, data);
    $loader.loadMap($state.save.mapId);
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

  openShop(data, { $state, $sound, $loader }) {
    $state.shopid = data;
  },

  play(data, { $state, $sound, $loader }) {
    return $sound.play(data);
  },
};

export default config;
