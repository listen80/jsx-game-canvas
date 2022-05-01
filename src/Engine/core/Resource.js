import { loadJSON, loadText, loadImage } from "../utils/http";

export default class Resource {
  constructor(game) {
    this.loaded = 0;
    this.total = 0;
    this.game = game;
    this.loading = false;
    this.load(game.json.map(v => `Data/${v}`));
    this.load(game.sprites.map(v => `Sprite/${v}.png`));
    this.load(game.images.map(v => `Graph/${v}`));

  }

  load(data) {
    this.loading = true;
    data.forEach((item) => {
      this.total++;
      this.loadOne(item).then((data) => {
        this.loaded++;
        if (this.loaded === this.total) {
          setTimeout(() => {
            this.loading = false
          }, 200)
        }
      })
    });
    // return Promise.all(loaderMap.map((url) => {
    //   return load(`Data/${url}`)
    // })).then(([game, save, shop, mapping]) => {
    //   Object.assign(this, { game, save, shop, mapping })
    //   const sprites = game.sprites
    //   Promise.all(sprites.map(url => load(`Sprite/${url}.dat`))).then(([enemys, items, animates, icons, npcs, terrains, boss]) => {
    //     Object.assign(this, { enemys, items, animates, icons, npcs, terrains, boss })
    //   })
    // })
  }

  loadOne(url) {
    if (url.endsWith(".dat")) {
      return loadText(`${url}`);
    }
    if (url.endsWith(".json")) {
      return loadJSON(`${url}`);
    }
    if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".webp")) {
      return loadImage(`${url}`);
    }
  }

  loadSprite() {}

  loadMap() {}
}
