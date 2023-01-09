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
      }, 116);
    }
  }

  loadMapping() {
    this.config.mapping.forEach((v) => {
      this.total++;
      loadText(`Data/${v}`).then((data) => {
        this.loaded++;
        this.$resource.mapping = data;
      });
    });
  }

  loadImage() {
    this.$resource.image = Object.create(null);
    this.config.images.forEach((v) => {
      this.total++;
      loadImage(`Image/${v}`).then((data) => {
        this.$resource.image[v] = data;
        this.loaded++;
        this.checkStatus();
      });
    });
  }

  loadSprite() {
    this.config.sprites.forEach((v) => {
      this.total++;
      loadImage(`Sprite/${v}.png`).then((data) => {
        this.$resource.image[v] = data;
        this.loaded++;
        this.checkStatus();
      });
      this.total++;
      loadText(`Sprite/${v}.dat`).then((data) => {
        this.$resource[v] = data;
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
