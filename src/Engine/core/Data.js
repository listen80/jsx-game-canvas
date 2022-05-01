import { loadJSON, loadText } from '../utils/http'

const load = url => url.endsWith('.dat') ? loadText(`${url}`) : loadJSON(`${url}`)
export default class Data {
  load () {
    const loaderMap = [
      'save.json',
      'shop.json',
      'mapping.dat',
    ]

    return Promise.all(loaderMap.map((url) => {
      return load(`Data/${url}`)
    })).then(([game, save, shop, mapping]) => {
      Object.assign(this, { game, save, shop, mapping })
      const sprites = game.sprites
      Promise.all(sprites.map(url => load(`Sprite/${url}.dat`))).then(([enemys, items, animates, icons, npcs, terrains, boss]) => {
        Object.assign(this, { enemys, items, animates, icons, npcs, terrains, boss })
      })
    })
  }
}
