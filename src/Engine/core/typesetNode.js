
export const typeset = (el, parent) => {
  const { style, children } = el
  const { paddingLeft, paddingTop, paddingRight, paddingBottom } = style
  const { width, height } = style
  const maxWidth = parent.style.width
  if (el instanceof Node) {
    let x = paddingLeft
    let y = paddingTop
    let rowHeight = 0
    let rowWidth = 0
    for (let i = 0; i < children.length; i++) {
      const child = typeset(children[i], el)
      const { style } = child
      const { height, width } = style
      if (x + width + paddingRight > maxWidth) {
        y += rowHeight
        rowHeight = 0
        x = paddingLeft
      }
      style.x = x
      style.y = y
      x += width
      rowWidth = Math.max(rowWidth, x)
      rowHeight = Math.max(rowHeight, height)
    }

    style.width = width || rowWidth + paddingRight
    style.height = height || y + rowHeight + paddingBottom
    return el
  }
  return el
}

// drawRoundRect (box) {
//   const { context, mergeStyle } = this
//   const { x, y, width, height, radius, style } = box
//   // mergeStyle(style)
//   context.translate(x, y)
//   context.beginPath()
//   context.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
//   context.lineTo(radius, height)
//   context.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
//   context.lineTo(0, radius)
//   context.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2)
//   context.lineTo(width - radius, 0)
//   context.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2)
//   context.lineTo(width, height - radius)
//   context.fill()
//   context.closePath()
// }
