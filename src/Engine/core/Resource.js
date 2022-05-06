import { loadJSON, loadText, loadImage, loadSound } from "../utils/http";

export default class Resource {
  constructor(config, $state) {
    this.loaded = 0;
    this.total = 0;
    this.$config = config;
    this.loading = false;

    this.$state = $state;

    this.load(
      config.json.map((v) => `Data/${v}`),
      "data"
    );

    this.load(
      config.mapping.map((v) => `Data/${v}`),
      "mapping"
    );

    this.load(
      config.sprites.map((v) => `Sprite/${v}.png`),
      "image"
    );

    this.load(
      config.sprites.map((v) => `Sprite/${v}.dat`),
      "sprite"
    );

    this.load(
      config.images.map((v) => `Image/${v}`),
      "image"
    );
    this.load(
      config.sounds.map((v) => `Sound/${v}`),
      "sound"
    );
  }

  load(data, type) {
    this.loading = true;
    const $state = this.$state;
    if (!$state[type]) {
      $state[type] = {}
    }
    data.forEach((itemO) => {
      this.total++;
      this.loadOne(itemO).then((data) => {
        this.loaded++;
        const item = itemO.replace(/\w+\//, '').replace(/\.\w+/, '')
        if (type === "data") {
          $state[item] = data;
        } else if (type === "mapping") {
          $state[type] = data;
        } else if (type === "sprite") {
          $state.sprite[item] = data;
        } else if (type === "image") {
          $state[type][itemO.replace(/\w+\//, '')] = data;
        } else if (type === "sound") {
          $state[type][item] = data;
        } else if (type === "spriteImage") {
          $state[type][item] = data;
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
