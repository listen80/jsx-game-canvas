import Engine from './Engine'
import Mota from './Mota'

if (typeof window !== 'undefined') {
  window.mota = new Engine(Mota)
}
