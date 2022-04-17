import Engine from './Engine'
import Mota from './Mota'

if (typeof window !== 'undefined') {
  // import('./Mota/index.jsx').then((Mota) => {
  //   debugger
  //   console.log(Mota)
  // })
  window.mota = new Engine(Mota)
}
