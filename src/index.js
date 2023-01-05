import Engine from './Engine'
import Mota from './Mota'

const mota = new Engine(Mota)

if (process.env.NODE_ENV === 'development') {
  window.game = mota
}
