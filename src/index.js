import Engine from './Engine'
import Mota from './Game'

const mota = new Engine(Mota)

if (__DEV__) {
  window.mota = mota
}
