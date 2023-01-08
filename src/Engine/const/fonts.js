export function checkFont(name, size = 16) {
  return document.fonts.check(`${size}px ${name}`);
}

export const fontsIos = [
  "娃娃体-简",
  "兰亭黑-简",
  "凌慧体-简",
  "翩翩体-简",
  "魏碑体-简",
  "雅痞体-简",
  "苹方-简",
  "楷体-简",
  "黑体-简",
  "宋体-简",
];

export const fontsMS = ["黑体", "宋体", "微软雅黑", "仿宋", "楷体"];

export const fontsAndroid = ["Roboto", "Noto Sans", "Droid"];

export const fonts = [...fontsMS, ...fontsIos, ...fontsAndroid];

export const fontFamily = fonts.find(checkFont);
