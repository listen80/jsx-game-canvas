import { loadFont } from '../utils/http'

export default class Font {
  constructor () {
    this.$font = Object.onCreate(null)
  }

  load (data) {
    return loadFont(data)
  }
}
