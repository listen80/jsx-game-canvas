import { loadSound } from "../utils/http";

export default class Sound {
  constructor(sounds) {
    this.sounds = sounds || Object.onCreate(null);
    this.loaded = 0;
    this.total = Infinity;
  }

  control(type, name, control) {
    const current = this.sounds[`${type}/${name}`].cloneNode();
    current.loop = type === "bgm";
    current[control]();
    return current;
  }

  load(dataArray) {
    this.total = dataArray.length;
    return Promise.all(
      dataArray.map((sound) =>
        loadSound(`Sound/${sound}`, (src, el) => {
          this.loaded++;
          this.sounds[sound] = el
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
