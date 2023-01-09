import Engine from 'Engine'
import Mota from 'Mota'

const mota = new Engine(Mota)

if (__DEV__) {
  window.game = mota
}
