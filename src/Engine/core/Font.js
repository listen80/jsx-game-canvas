import { loadFont } from '../utils/http'

export default class Font {
  constructor () {
    this.$font = Object.create(null)
  }

  load (data) {
    return loadFont(data)
  }
}
