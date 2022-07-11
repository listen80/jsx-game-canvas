import { loadGame, saveGame, setSave, checkSaveData } from "../utils/sl";

const map = {}

const registry = (key, cb) => {
  map[key] = cb
}

const hooks = function ($state, key, data, next) {
  const $res = $state.$res
  switch (key) {

    case "startGame":
      Object.assign($state.save, $state.config.save)
      $res.loadMap($state.save.mapId);
      break;

    case "loadGame":
      Object.assign($state.save, loadGame())
      $res.loadMap($state.save.mapId);
      break;

    case "saveGame":
      saveGame($state.save)
      break;

    case "loadMap":
      Object.assign($state.save, data)
      $res.loadMap($state.save.mapId);
      break;

    case "toTitle":
      $state.map = null;
      break;

    case "getItems":
      setSave($state, 'items', data)
      break;

    case "setSave":
      setSave($state, data, next)
      break;

    case "checkSaveData":
      return checkSaveData($state, data, next)

    default:
      if (map[key]) {
        return map[key]($state, data, next)
      } else {
        console.error(key, data)
      }
  }
};

export { hooks, registry }
