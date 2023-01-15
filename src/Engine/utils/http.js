import { formatText } from "../../Mota/utils/format";

export const loadImage = (src, callback) => {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.addEventListener("load", () => {
      callback && callback(src, img);
      resolve(img);
    });
    img.addEventListener("error", () => reject(img));
    img.src = src;
  });
};

export const loadSound = (src, callback) => {
  const audio = new Audio();
  audio.addEventListener("canplay", () => {
    callback && callback(src, audio);
  });
  audio.addEventListener("error", () => callback(audio));
  audio.src = src;
  return audio;
};

export function loadJSON(url) {
  return fetch(url).then((data) => data.json());
}

export function loadText(url) {
  return fetch(url)
    .then((data) => data.text())
    .then((data) => formatText(data));
}

export function loadFont({ name, url }) {
  const fontface = new FontFace(name, `url("${url}")`);
  document.fonts.add(fontface);
  fontface.load();
  return fontface.loaded;
}
