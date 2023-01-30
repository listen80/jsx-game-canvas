import { loadSound } from "../utils/http";

export default class Sound {
  constructor(config) {
    this.config = config;
    this.sounds = Object.create(null);
    this.total = Infinity;
  }

  control(type, name, control) {
    return loadSound(`Sound/${type}/${name}`, (src, el) => {
      el.loop = type === "bgm";
      el[control]().catch((e) => e && console.log(e));
    });
  }

  load(dataArray) {
    this.total = dataArray.length;
    return Promise.all(
      dataArray.map((sound) =>
        loadSound(`Sound/${sound}`, (src, el) => {
          this.loaded++;
          this.sounds[sound] = el;
          // sounds.forEach((Sound, i) => (this.sounds[dataArray[i]] = Sound));
        })
      )
    );
  }

  play(type, name) {
    return this.control(type, name, "play");
  }

  pause(type, name) {
    return this.control(type, name, "pause");
  }
}
