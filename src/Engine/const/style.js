import { fontFamily } from './fonts'

export const baseStyle = {
  direction: 'ltr',
  fillStyle: 'black',
  fillStyle: '#fff',
  // filter: 'grayscale(.9)',
  filter: 'none',
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
  textAlign: 'center',
  // textBaseline: "alphabetic",
  textBaseline: 'middle',
  // textBaseline: "top",
}

// const { textAlign, textBaseline } = context;
// const x = { start: 0, left: 0, center: 0.5, right: 1, end: 0 };
// const y = {
//   alphabetic: 0,
//   hanging: 0,
//   ideographic: 0,
//   top: 0,
//   middle: 0.5,
//   bottom: 1,
// };
// start 默认。文本在指定的位置开始。
// end 文本在指定的位置结束。
// center 文本的中心被放置在指定的位置。
// left 文本在指定的位置开始。
// right 文本在指定的位置结束。

// alphabetic 默认。文本基线是普通的字母基线。
// top 文本基线是 em 方框的顶端。
// hanging 文本基线是悬挂基线。
// middle 文本基线是 em 方框的正中。
// ideographic 文本基线是表意基线。
// bottom 文本基线是 em 方框的底端。
// context.fillText(
//   text,
//   (offsetX + width * x[textAlign]) * size,
//   (offsetY + height * y[textBaseline]) * size
// );
