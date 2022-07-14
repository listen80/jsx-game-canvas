const path = require('path')
const fs = require('fs')

const dir = './public/Maps'
fs.readdirSync(dir).forEach((file) => {

  // if (!file.startsWith('MT')) {
  //   fs.renameSync(path.join(dir, file), path.join(dir, `MT${file}`))
  // }

  const s = JSON.parse(fs.readFileSync(path.join(dir, file)).toString())
  const { name, ground, mapTerrains, width, height, bgm, mapEvents } = s
  if (mapEvents) {
    // let i = mapEvents.length - 1
    // for (;i >= 0; i--) {
    //   const [ x, y,value, event] = mapEvents[i]
    //   if (mapTerrains[y][x] === 0 && !event) {
    //     mapTerrains[y][x] = value
    //     mapEvents.splice(i, 1)
    //   }
    // }
    mapEvents.forEach(() => {
      
    })
  }
  // console.log()
  // mapEvents && mapEvents.forEach((mapEvent, i) => {
  //   const [x, y, value, events] = mapEvent
  //   events && events.forEach(e => {
  //     if (e?.data?.position) {
  //       e.data.position.x /= 32
  //       e.data.position.y /= 32
  //     }
  //   })
  // })
  fs.writeFileSync(path.join(dir, file), JSON.stringify(s, null, 4))
})
