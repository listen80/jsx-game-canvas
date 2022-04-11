import { loadFont } from '../utils/http'

export default class Font {
  constructor() {
  }

  load(data) {
    return loadFont(data)
  }

}
