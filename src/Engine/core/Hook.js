import { loadGame, saveGame } from "../utils/sl";

const map = {
  findPathInMap: () => {

  }
}

const registry = (key, cb) => {
  map[key] = cb
  // console.log(map)
}

window.registry = registry

const hooks = function ($state, key, data, cb) {
  if (typeof key === typeof null) {
    data = key.data
    cb = key.cb
    key = key.type
  }

  $res = $state.$res
  switch (key) {
    case "startGame":
      Object.assign($state.save, $state.config.save)
      $res.loadMap($state.save.mapId);
      // map = loadMap($state.save.mapId);
      // $state.randMapKey = `${$state.save.mapId} ${new Date()}`;
      break;

    case "loadGame":
      Object.assign($state.save, loadGame())
      $state.mapKey = Math.random()
      $res.loadMap($state.save.mapId);
      break;

    case "saveGame":
      saveGame($state.save)
      break;

    case "toTitle":
      $state.map = null;
      break;

    case "loadMap":
      Object.assign($state.save, data)
      $state.mapKey = Math.random()
      $res.loadMap($state.save.mapId);
      break;

    case "message":
      $state.message = data;
      break;

    case "messageClose":
      $state.message = null;
      break;

    default:
      return map[key] && map[key]($state, data, cb)

  }
};

hooks.registry = registry

export default hooks
