import { loadGame, saveGame, updateSaveDataX } from "../utils/sl";

const map = {}

const registry = (key, cb) => {
  map[key] = cb
}

const hooks = function ($state, key, data, next) {
  if (typeof key === typeof null) {
    data = key.data
    next = key.next
    key = key.type
  }
  console.info(data, next)

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
      updateSaveDataX($state, 'items', data)
      break;

    case "updateSaveDataX":
      updateSaveDataX($state, data, next)
      break;

    default:
      if (map[key]) {
        return map[key]($state, data, next)
      } else {
        console.error(key, data)
      }
  }
};

export { hooks, registry }
