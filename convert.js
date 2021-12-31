const path = require('path')
const fs = require('fs')

const dir = './public/Maps'
fs.readdirSync(dir).forEach((file) => {
  if (!file.startsWith('MT')) {
    fs.renameSync(path.join(dir, file), path.join(dir, `MT${file}`))
  }

  // const s = JSON.parse(fs.readFileSync(file).toString())
  // const { name, ground, mapTerrains, width, height, bgm, mapEvents } = s

  // mapEvents.forEach((mapEvent, i) => {
  //   const [x, y, value, events] = mapEvent
  //   events && events.forEach(e => {
  //     if (e.type === 'mapLoad') {
  //       e.data.mapId = 'MT' + e.data.mapId
  //     }
  //   })
  // })
  // fs.writeFileSync(file, JSON.stringify(s))
})
