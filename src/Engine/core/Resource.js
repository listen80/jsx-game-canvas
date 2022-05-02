import { loadJSON, loadText, loadImage, loadSound } from "../utils/http";

export default class Resource {
  constructor(config) {
    this.loaded = 0;
    this.total = 0;
    this.$config = config;
    this.loading = false;

    this.$data = Object.create(null);
    this.$images = Object.create(null);
    this.$sounds = Object.create(null);

    this.load(
      config.json.map((v) => `Data/${v}`),
      "data"
    );
    this.load(
      config.sprites.map((v) => `Sprite/${v}.png`),
      "sprite"
    );
    this.load(
      config.images.map((v) => `Graph/${v}`),
      "graph"
    );
    this.load(
      config.sounds.map((v) => `Sound/${v}`),
      "audio"
    );
  }

  load(data, type) {
    this.loading = true;
    data.forEach((item) => {
      this.total++;
      this.loadOne(item).then((data) => {
        this.loaded++;
        item = item.replace(/\w+\//, '').replace(/\.\w+/, '')
        if (type === "data") {
          this.$config[item] = data;
        } else if (type === "sprite") {
          this.$data[item] = data;
        } else if (type === "graph") {
          this.$images[item] = data;
        } else if (type === "audio") {
          this.$images[item] = data;
        }
        if (this.loaded === this.total) {
          const timer = setTimeout(() => {
            this.loading = false;
            clearTimeout(timer);
          }, 200);
        }
      });
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
    } else {
      return loadSound(`${url}`)
    }
  }

  loadJSON() {}
  loadSprite(sprites) {}

  loadMap(id) {
    return loadJSON(`Maps/${id}.json`)
  }
}
