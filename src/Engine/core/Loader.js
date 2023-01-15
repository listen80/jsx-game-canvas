import { loadJSON, loadText, loadImage, loadSound } from "../utils/http";

export default class Loader {
  constructor() {
    this.loaded = 0;
    this.total = 0;
    this.loading = false;

    this.$resource = Object.create(null);
    this.$resource.maps = Object.create(null);
    this.$resource.image = Object.create(null);
    this.$resource.sprites = Object.create(null);
  }

  init(config) {
    this.loading = true;
    this.config = config.resource;
    this.loadMapping();
    this.loadImage();
    this.loadSprite();
  }

  checkStatus() {
    if (this.loaded === this.total) {
      const timer = setTimeout(() => {
        this.loading = false;
        clearTimeout(timer);
      }, 0);
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

    this.config.sprites.forEach((name) => {
      this.total++;
      loadImage(`Sprite/${name}.png`).then((data) => {
        this.$resource.image[name] = data;
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
    if (this.$resource.maps[id]) {
      return Promise.resolve(this.$resource.maps[id]);
    }
    this.loaded = 0;
    this.total = 0;

    this.total++;
    return loadJSON(`Maps/${id}.json`).then((data) => {
      this.$resource.maps[id] = data;
      this.loaded++;
      this.checkStatus();
      return data;
    });
  }

  loadConfig() {
    return loadJSON("config.json");
  }
}
