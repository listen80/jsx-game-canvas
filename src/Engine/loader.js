import { loadJSON, loadFont } from './utils/http'

export const loadMap = mapId => {
  return loadJSON(`Maps/${mapId}.json`)
}
