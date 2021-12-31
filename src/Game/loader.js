import { loadImage, loadSound, loadJSON, loadFont, loadText } from './http'

const resource = {
  images: {},
  sounds: {},
}

window.$res = resource

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

export const loaderData = () => Promise.all(arr3.map(url => url.endsWith('.dat') ? loadText(`${url}`) : loadJSON(`${url}`)))
  .then(([game, save, shop, mapping, enemys, items, animates, icons, npcs, terrains, boss]) => {
    Object.assign(resource, { game, save, shop, mapping, enemys, items, animates, icons, npcs, terrains, boss })
  })

const loadImages = () => {
  const o = sprite.map(v => `Sprite/${v}.png`)
  const o2 = ['Characters/hero.png', 'ground.png', 'Battlebacks/mota.jpg'].map(v => `Graph/${v}`)

  return Promise.all([...o, ...o2].map(src => {
    return new Promise((resolve) => {
      loadImage(`${src}`).then((img) => {
        src = src.replace('Graph/', '')
        if (src.includes('Sprite')) {
          src = src.split('/')[1]
        }
        resource.images[src] = img
        resolve()
      })
    })
  }))
}

export const loaderImage = () => Promise.all([loadImages()])
const sounds = [
  'bgm/terror.mp3',
  'bgm/prologue.mp3',
  'bgm/area1.mp3',
  'bgm/area2.mp3',
  'bgm/area3.mp3',
  'enemy/redWizard.mp3',
  'enemy/brownWizard.mp3',
  'enemy/whiteKing.mp3',
  'enemy/blackMagician.mp3',
  'se/attack.mp3',
  'se/floor.mp3',
  'se/door.mp3',
  'se/buy.mp3',
  'se/item.mp3',
  'se/dialogue.mp3',
  'se/unlockCtrl.mp3',
  'se/step.mp3',
  'se/constants.mp3',
  'se/sell.mp3',
  'se/load.mp3',
]

export const loaderMusic = () => Promise.all([
  loadSounds(sounds),
  // loadSounds(sounds.sounds),
])

export const loaderFont = (font) => {
  return loadFont(font)
}

const loadSounds = data => {
  return Promise.all(data.map(sound => loadSound(`Audio/${sound}`))).then(audioes => {
    audioes.forEach((audio, i) => (resource.sounds[data[i]] = audio))
  })
}

export const loadMap = mapId => {
  return loadJSON(`Maps/${mapId}.json`)
}
