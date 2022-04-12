import { loadJSON, loadText } from '../utils/http'
// import { loadImage, loadSound, loadJSON, loadFont, loadText } from './utils/http'

export default class Data {
  load () {
    const loaderMap = [
      'game.json',
      'save.json',
      'shop.json',
      'mapping.dat',
    ]

    const sprite = [
      'enemys',
      'items',
      'animates',
      'icons',
      'npcs',
      'terrains',
      'boss',
    ]

    const arr3 = [].concat(loaderMap.map(v => `Data/${v}`), sprite.map(v => `Sprite/${v}.dat`))

    const loaderData = () => Promise.all(arr3.map(url => url.endsWith('.dat') ? loadText(`${url}`) : loadJSON(`${url}`)))
      .then(([game, save, shop, mapping, enemys, items, animates, icons, npcs, terrains, boss]) => {
        Object.assign(this, { game, save, shop, mapping, enemys, items, animates, icons, npcs, terrains, boss })
      })
    return loaderData()
  }
}
