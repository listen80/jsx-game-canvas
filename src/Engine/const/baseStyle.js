export function checkFont(name, size = 16) {
  return document.fonts.check(`${size}px ${name}`)
}

export const fontsIos = [
  '娃娃体-简',
  '兰亭黑-简',
  '凌慧体-简',
  '翩翩体-简',
  '魏碑体-简',
  '雅痞体-简',
  '苹方-简',
  '楷体-简',
  '黑体-简',
  '宋体-简',
]

export const fontsMS = [
  '黑体',
  '宋体',
  '微软雅黑',
  '仿宋',
  '楷体'
]

export const fontsAndroid = ['Roboto', 'Noto Sans', 'Droid']

export const fontFamily = [...fontsMS, ...fontsIos, ...fontsAndroid].find(checkFont)

export const baseStyle = {
  direction: 'ltr',
  fillStyle: '#fff',
  // filter: 'grayscale(.9)',
  // filter: 'none',
  font: '16px ' + fontFamily,
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  // imageSmoothingEnabled: true,
  // imageSmoothingQuality: 'low',
  imageSmoothingEnabled: false,
  lineCap: 'butt',
  lineDashOffset: 0,
  lineJoin: 'miter',
  lineWidth: 1,
  miterLimit: 10,
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  strokeStyle: 'white',
  textAlign: 'start',
  // textBaseline: "alphabetic",
  textBaseline: 'top',
}
