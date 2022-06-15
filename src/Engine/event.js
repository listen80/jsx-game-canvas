import { loadGame, saveGame } from "./utils/sl";
const events = function ($state, key, data) {
  if (typeof key === typeof null) {
    data = key.data
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
      $res.loadMap($state.save.mapId);
      break;

    case "saveGame":
      saveGame($state.save)
      break;

    case "toTitle":
      $state.map = null;
      break;

    case "loadMap":
      $state.save.mapId = data
      $res.loadMap($state.save.mapId);
      break;

    case "message":
      $state.message = data;
      break;

    case "messageClose":
      $state.message = null;
      break;

    case "mapLoad":
      Object.assign($state.save, data)
      $res.loadMap($state.save.mapId)
      // $state.message = null;
      break;

  }

};

export default events