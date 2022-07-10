import { loadGame, saveGame } from "../utils/sl";

const map = {}

const registry = (key, cb) => {
  map[key] = cb
  // console.log(map)
}

const updateSaveDataX = ($state, context, gets, n = 1) => {
  const updateSaveData = (context, gets, n = 1) => {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => updateSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? $state.save[context] : $state.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === "object") {
      updateSaveData(context, Object.entries(gets));
    } else {
      // console.error(gets, n)
    }
  }
  updateSaveData(context, gets, n = 1)
}

const hooks = function ($state, key, data, cb) {
  if (typeof key === typeof null) {
    data = key.data
    cb = key.cb
    key = key.type
  }

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

    default:
      if (map[key]) {
        return map[key]($state, data, cb)
      } else {
        console.error(key, data)
      }
  }
};

hooks.registry = registry
export default hooks
