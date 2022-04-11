import { loadImage, loadSound, loadJSON, loadFont, loadText } from './utils/http'

export const loaderFont = (font) => {
  return loadFont(font)
}

export const loadMap = mapId => {
  return loadJSON(`Maps/${mapId}.json`)
}
