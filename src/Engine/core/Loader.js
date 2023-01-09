import { loadJSON, loadText, loadImage, loadSound } from "../utils/http";

export default class Loader {
  constructor() {
    this.loaded = 0;
    this.total = 0;
    this.loading = false;

    this.$resource = Object.create(null);
  }

  init(config) {
    this.config = config;
    this.loadMapping();
    this.loadImage();
    this.loadSprite();
  }

  checkStatus() {
    if (this.loaded === this.total) {
      const timer = setTimeout(() => {
        this.loading = false;
        clearTimeout(timer);
      }, 200);
    }
  }

  loadMapping() {
    this.config.mapping.forEach((name) => {
      this.total++;
      loadText(`Data/${name}`).then((data) => {
        this.loaded++;
        this.$resource.mapping = data;
      });
    });
  }

  loadImage() {
    this.$resource.image = Object.create(null);
    this.config.images.forEach((name) => {
      this.total++;
      loadImage(`Image/${name}`).then((data) => {
        this.$resource.image[name] = data;
        this.loaded++;
        this.checkStatus();
      });
    });
  }

  loadSprite() {
    this.$resource.sprites = Object.create(null);

    this.config.sprites.forEach((name) => {
      this.total++;
      loadImage(`Sprite/${name}.png`).then((data) => {
        this.$resource.sprites[name] = data;
        this.loaded++;
        this.checkStatus();
      });
      this.total++;
      loadText(`Sprite/${name}.dat`).then((data) => {
        this.$resource.sprites[name] = data;
        this.loaded++;
        this.checkStatus();
      });
    });
  }

  loadMap(id) {
    this.$resource.maps = Object.create(null);

    this.loaded = 0;
    this.total = 0;

    this.total++;
    loadJSON(`Maps/${id}.json`).then((data) => {
      this.$resource.maps[id] = data;
      this.loaded++;
      this.checkStatus();
    });
  }

  loadConfig() {
    return loadJSON("config.json")
  }
}
