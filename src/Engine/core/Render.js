import { baseStyle } from '../const/baseStyle'
import { isPrimitive, isFunc, isArray, isUndefined } from '../utils/common'
import { curFoucs } from './Component'

const moveEvent = 'MouseMove'
const mouseEvents = ['ContextMenu', 'Click', 'Wheel', moveEvent]

//  "MouseDown", "MouseUp"
const keyEvents = ['KeyDown', 'KeyUp']

export default class UI {
  constructor (game, screen = {}) {
    const canvas = document.createElement('canvas')
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    const { el, width = 32 * (13 + 5), height = 32 * 13 } = screen
    this.screen = screen
    this.canvas.width = width
    this.canvas.height = height
    const dom = document.querySelector(el) || document.body
    dom && dom.appendChild(this.canvas)
    this.mergeStyle(baseStyle)

    this.mouseEvents = []
    this.keyEvents = []
    this.onMouseClick = []
    this.bind()
    this.$images = game.$images
  }

  getImage = (src) => {
    return this.$images.images[src]
  }

  bind () {
    mouseEvents.forEach((name) => {
      this.canvas.addEventListener(name.toLowerCase(), (e) => {
        e.name = 'on' + name
        this.mouseEvents.push(e)
        e.preventDefault()
      }, { passive: false })
    })

    // const name = moveEvent
    // this.canvas.addEventListener(name.toLowerCase(), (e) => {
    //   e.name = 'on' + name
    //   this.moveEvent = e
    //   e.preventDefault()
    // }, { passive: false })

    keyEvents.forEach((name) => {
      document.addEventListener(name.toLowerCase(), (e) => {
        e.name = 'on' + name
        this.keyEvents = e
      })
    })
  }

  toDataURL () {
    return this.canvas.toDataURL()
  }

  mergeStyle = style => {
    if (style) {
      const { fontSize, fontFamily, font, textAlign, textBaseline, color, globalAlpha } = style
      if (globalAlpha) {
        this.context.globalAlpha = globalAlpha
      }
      if (textAlign) {
        this.context.textAlign = textAlign
      }
      if (textBaseline) {
        this.context.textBaseline = textBaseline
      }
      if (color) {
        this.context.fillStyle = color
      }
      if (font) {
        this.context.font = font
      }
      if (fontSize) {
        this.context.font = this.context.font.replace(/\d+/, fontSize)
      }
      if (fontFamily) {
        this.context.font = this.context.font.replace(/[\u4e00-\u9fa5]+/, fontFamily)
      }
    }
  };

  clearRect () {
    const { context, canvas } = this
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  drawText (node, offsetX, offsetY) {
    const { style, text } = node
    const { context } = this
    const { x = 0, y = 0 } = style
    context.fillText(text, offsetX + x, offsetY + y)
  }

  drawImage (node, offsetX, offsetY) {
    const { props } = node
    if (props) {
      const { style = {} } = props
      if (style) {
        const { sx = 0, sy = 0, width = 32, height = 32, swidth, sheight } = style
        const { context } = this
        context.drawImage(this.getImage(props.src), sx, sy, swidth || width, sheight || height, offsetX, offsetY, width, height)
      }
    }
  }

  drawBack (node, offsetX, offsetY) {
    const { context } = this
    const { backgroundImage, backgroundColor, height, width } = node.props.style
    if (backgroundColor) {
      context.save()
      context.beginPath()
      context.rect(offsetX, offsetY, width, height)
      context.fillStyle = backgroundColor
      context.fill()
      context.closePath()
      context.restore()
    }
    if (backgroundImage) {
      context.save()
      context.beginPath()
      context.rect(offsetX, offsetY, width, height)
      context.fillStyle = context.createPattern(this.getImage(backgroundImage), 'repeat')
      context.fill()
      context.closePath()
      context.restore()
    }
  }

  drawBorder (node, offsetX, offsetY) {
    const { context } = this
    const { borderWidth, borderColor, height, width } = node.props.style
    if (borderWidth) {
      context.save()
      context.lineWidth = borderWidth
      context.beginPath()
      context.rect(offsetX, offsetY, width, height)
      if (borderColor) {
        context.strokeStyle = borderColor
      }
      context.stroke()
      context.closePath()
      context.restore()
    }
  }

  translate (box) {
    const { context } = this
    const { style } = box
    const { x = 0, y = 0 } = style
    context.translate(x, y)
  }

  transform (box) {
    const { context } = this
    const { rotate, scale } = box
    if (rotate) {
      const { angle = 0, x = 0, y = 0 } = rotate
      context.translate(x, y)
      context.rotate(angle * Math.PI / 180)
      context.translate(-x, -y)
    }
    if (scale) {
      const { x = 0, y = 0, scaleX = 1, scaleY = 1 } = scale
      context.translate(x, y)
      context.scale(scaleX, scaleY)
      context.translate(-x, -y)
    }
  }

  drawCircle (node, offsetX, offsetY) {
    const { context } = this
    context.save()
    context.beginPath()
    const { cx, cy, r, sAngle, eAngle, counterclockwise = false, stroke, strokeWidth } = node.props
    context.arc(cx + offsetX, cy + offsetY, r, sAngle / 180 * Math.PI, eAngle / 180 * Math.PI, counterclockwise)
    context.strokeStyle = stroke
    context.lineWidth = strokeWidth
    context.stroke()
    context.closePath()
    context.restore()
  }

  drawLine (node) {
    const { context } = this
    const { x1 = 0, y1 = 0, x2 = 200, y2 = 200 } = node.props
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
  }

  drawRect (node, offsetX, offsetY, parent) {
    const { context } = this
    context.save()
    const { props, tag } = node
    if (props) {
      const { style } = props
      this.mergeStyle(style)
      if (style) {
        this.drawBack(node, offsetX, offsetY)
        this.drawBorder(node, offsetX, offsetY)
      }
    }
    if (tag === 'img') {
      this.drawImage(node, offsetX, offsetY)
    } else if (tag === 'circle') {
      this.drawCircle(node, offsetX, offsetY)
    } else if (tag === 'line') {
      this.drawLine(node, offsetX, offsetX)
    } else if (tag !== 'div') {
      console.error(tag)
    }
    this.renderRect(node.children, offsetX, offsetY, node)
    context.restore()
  }

  renderPrimitive (text, offsetX, offsetY, parent) {
    const { context } = this
    const { textAlign, textBaseline } = context
    const { width = 0, height = 0 } = parent?.props?.style || {}
    const x = { start: 0, left: 0, center: 0.5, right: 1, end: 0 }
    const y = { alphabetic: 0, hanging: 0, ideographic: 0, top: 0, middle: 0.5, bottom: 1 }
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
    context.fillText(text, offsetX + width * x[textAlign], offsetY + height * y[textBaseline])
  }

  renderRect (createdNode, offsetX, offsetY, parent) {
    // undefined null
    // string number
    // array
    // class component
    // div node
    if (!isUndefined(createdNode)) {
      if (isPrimitive(createdNode)) {
        this.renderPrimitive(createdNode, offsetX, offsetY, parent)
      } else if (isArray(createdNode)) {
        createdNode.forEach(child => this.renderRect(child, offsetX, offsetY, parent))
      } else if (createdNode.instance) {
        // tag 是 function
        this.renderRect(createdNode.instance.$node, offsetX, offsetY, parent)
      } else {
        // div node
        this.renderNode(createdNode, offsetX, offsetY, parent)
      }
    }
  }

  renderNode (node, offsetX, offsetY, parent) {
    const { context } = this
    context.save()
    const style = node?.props?.style
    if (style) {
      const { x = 0, y = 0 } = style
      offsetX += x
      offsetY += y
      this.mouseEvents.forEach((event) => {
        const { name } = event
        if (event.offsetX >= offsetX && event.offsetX < style.width + offsetX && event.offsetY >= offsetY && event.offsetY < style.height + offsetY) {
          if (name === 'onMouseMove') {
            this.onMouseMove = { node, event }
          } else if (name === 'onClick') {
            this.onMouseClick.push({ node, event })
          }
        }
      })
    }

    this.drawRect(node, offsetX, offsetY)

    context.restore()
  }

  runEvent () {
    if (curFoucs && this.keyEvents) {
      const { name } = this.keyEvents
      curFoucs[name] && curFoucs[name](this.keyEvents)
    }
    this.keyEvents = null
    // if (this.moveEventTarget && this.moveEvent) {
    //   if (moveEventTarget !== this.moveEventTarget) {
    //     if (moveEventTarget) {
    //       moveEventTarget.props.onMouseLeave && moveEventTarget.props.onMouseLeave()
    //     }
    //     moveEventTarget = this.moveEventTarget
    //     moveEventTarget.props.onMouseEnter && moveEventTarget.props.onMouseEnter()
    //   }
    // }
    this.onMouseClick.forEach(({ node, event }) => {
      if (node?.props?.onClick) {
        node.props.onClick(event)
      }
    })
    this.onMouseClick = []
    this.mouseEvents = []
    this.moveEvent = null
    this.moveEventTarget = null
  }

  render (createdNode) {
    this.clearRect()
    this.renderRect(createdNode, 0, 0, this.canvas)
    this.runEvent()
  }
}
